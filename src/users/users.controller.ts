import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
  @Post()
  async createUser(@Body() body: CreateUserDto) {
    console.log('Creating user:', body);
    return this.usersService.createUser(body);
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    console.log('Deleting user with ID:', id);
    console.log(typeof id);
    const userId = parseInt(id, 10);
    return this.usersService.deleteUser(userId);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    console.log('Fetching user with ID:', id);
    const userId = parseInt(id, 10);
    return this.usersService.getUserById(userId);
  }
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body: CreateUserDto) {
    console.log('Updating user with ID:', id, 'Data:', body);
    const userId = parseInt(id, 10);
    return this.usersService.updateUser(userId, body);
  }
}
