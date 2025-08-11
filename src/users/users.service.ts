import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

const LIST_KEY = 'users:all:v2'
const userKey = (id: number) => `users:${id}`;

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async getUsers() {
    const cached = await this.cache.get<any[]>(LIST_KEY);
    if (cached) {
      console.log('cached');
      return cached;
    }

    const users = await this.prismaService.user.findMany({
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
      orderBy: { id: 'asc' },
    });

    await this.cache.set(LIST_KEY, users, await this.ttl());
    return users;
  }

  async getUserById(id: number) {
    const key = userKey(id);
    const cached = await this.cache.get<any>(key);
    if (cached) return cached;

    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    });

    if (!user) throw new UnauthorizedException('User not found');

    await this.cache.set(key, user, await this.ttl());
    return user;
  }

  async createUser(data: CreateUserDto) {
    const exists = await this.prismaService.user.findUnique({
      where: { email: data.email },
      select: { id: true },
    });
    if (exists) throw new UnauthorizedException('User already exists');

    const user = await this.prismaService.user.create({
      data: { name: data.name, email: data.email },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    });

    await this.cache.del(LIST_KEY);
    await this.cache.set(userKey(user.id), user, await this.ttl());
    return user;
  }

  async updateUser(id: number, data: CreateUserDto) {
    const exists = await this.prismaService.user.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!exists) throw new UnauthorizedException('User not found');

    const updated = await this.prismaService.user.update({
      where: { id },
      data: { name: data.name, email: data.email },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    });

    await Promise.all([this.cache.del(userKey(id)), this.cache.del(LIST_KEY)]);
    await this.cache.set(userKey(id), updated, await this.ttl());
    return updated;
  }

  async deleteUser(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!user) throw new UnauthorizedException('User not found');

    await this.prismaService.user.delete({ where: { id } });

    await Promise.all([this.cache.del(userKey(id)), this.cache.del(LIST_KEY)]);
    return { message: 'User deleted successfully' };
  }

  async testRedis() {
    await this.cache.set('test', 'ok', 10);
    const valor = await this.cache.get('test');
    return { valor };
  }

  private async ttl() {
    const env = Number(process.env.REDIS_TTL);
    return Number.isFinite(env) && env > 0 ? env : 60;
  }
}
