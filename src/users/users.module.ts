import { PrismaService } from 'src/prisma/prisma.service';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
