import { Body, ConflictException, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginBody } from '../users/dto/users.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async login(@Body() Body: LoginBody) {
    try {
      return this.authService.login(Body);
    } catch ({ message: error }) {
      throw new ConflictException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error });
    }
  }

  @Post('signup')
  async signup(@Body() Body: CreateUserDto) {
    try {
      return this.authService.signup(Body);
    } catch ({ message: error }) {
      throw new ConflictException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error });
    }
  }
}
