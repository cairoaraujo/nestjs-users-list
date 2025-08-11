import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { UsersController } from './users/users.controller';
import { UserService } from './users/users.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        store: redisStore as any,
        host: config.get<string>('REDISHOST'),
        port: config.get<number>('REDISPORT'),
        password: config.get<string>('REDISPASSWORD'),
        ttl: config.get<number>('REDISTTL') || 60,
      }),
      isGlobal: true,
    }),
  ],
  controllers: [UsersController],
  providers: [UserService, PrismaService],
})
export class AppModule {}
