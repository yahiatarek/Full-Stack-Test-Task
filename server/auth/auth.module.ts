import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersService } from 'users/users.service';
import { UsersModule } from 'users/users.module';

@Module({
  controllers: [AuthController],
  imports: [UsersModule],
  providers: [AuthService, JwtService, UsersService],
  exports: [],
})
export class AuthModule {}
