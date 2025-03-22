import { Body, ConflictException, Controller, HttpStatus, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginBody } from '../users/dto/users.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller()
export class AuthController {
  logger: Logger = new Logger('auth controller');
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User sign in' })
  @Post('signin')
  async login(@Body() Body: LoginBody) {
    try {
      return this.authService.login(Body);
    } catch (error) {
      const errMsg = (error as Error).message;
      throw new ConflictException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: errMsg });
    }
  }

  @ApiOperation({ summary: 'User sign up' })
  @Post('signup')
  async signup(@Body() Body: CreateUserDto) {
    try {
      return this.authService.signup(Body);
    } catch (error) {
      const errMsg = (error as Error).message;
      throw new ConflictException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: errMsg });
    }
  }
}
