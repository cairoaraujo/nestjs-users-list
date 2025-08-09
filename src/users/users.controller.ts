import { Body, Controller, Get, Post } from '@nestjs/common';
import type { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UserService) {}
  @Get()
  async getUsers(): Promise<any> {
    console.log('Fetching users');
    return this.usersService.getUsers();
  }
  @Post('user')
  async createUser(@Body() body: CreateUserDto) {
    console.log('Creating user:', body);
    return this.usersService.createUser(body);
  }
}
