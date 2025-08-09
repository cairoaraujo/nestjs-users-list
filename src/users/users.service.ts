/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async getUsers() {
    const users = await this.prismaService.user.findMany();
    if (!users) {
      throw new UnauthorizedException('No users found');
    }
    return users;
  }
  async createUser(data: CreateUserDto) {
    const userAlreadyExists = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });
    if (userAlreadyExists) {
      throw new UnauthorizedException('User already exists');
    }
    const user = await this.prismaService.user.create({
      data: {
        name: data.name,
        email: data.email,
        createdAt: new Date(),
      },
    });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
