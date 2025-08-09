import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UserService } from './users/users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UserService],
})
export class AppModule {}
