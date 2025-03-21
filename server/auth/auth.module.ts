import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersService } from 'users/users.service';
import { UsersModule } from 'users/users.module';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({
      secretOrPrivateKey: 'secret',
      secret: 'secret',
    }),
  ],
  providers: [AuthService, JwtService, UsersService],
  exports: [],
})
export class AuthModule {}
