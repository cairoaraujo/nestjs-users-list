import { Body, Controller, Get, Post } from '@nestjs/common';
import type { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UserService) {}
  @Get()
  getUsers(): string {
    console.log('Fetching users');
    this.usersService.getUsers();
    return 'List of users will be returned here';
  }
  @Post('user')
  async createUser(@Body() body: CreateUserDto) {
    console.log('Creating user:', body);
    await this.usersService.createUser(body);
  }
}
