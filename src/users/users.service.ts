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
  async deleteUser(id: number) {
    console.log(typeof id);
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    await this.prismaService.user.delete({
      where: { id },
    });
    return { message: 'User deleted successfully' };
  }
  async getUserById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
  async updateUser(id: number, data: CreateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
      },
    });
    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      createdAt: updatedUser.createdAt,
    };
  }
}
