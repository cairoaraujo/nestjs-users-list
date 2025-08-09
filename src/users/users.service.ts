import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  getUsers() {
    console.log('Fetching users from service');
    return 'List of users will be returned here';
  }
  async createUser(data: CreateUserDto) {
    console.log(data);
    return 'test';
  }
}
