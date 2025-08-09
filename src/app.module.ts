import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UserService } from './users/users.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UserService, PrismaService],
})
export class AppModule {}
