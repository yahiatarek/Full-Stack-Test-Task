import { Body, ConflictException, Controller, HttpStatus, Logger, Post } from '@nestjs/common';

import { UserDataDto } from '../users/dto/users.dto';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class UserController {
  logger: Logger = new Logger('user service');

  constructor(private readonly jwtService: JwtService) {}

  @ApiOperation({ summary: 'get user data' })
  @Post('data')
  async getUserData(@Body() Body: UserDataDto) {
    const userData = this.jwtService.verify(Body.token, { secret: process.env.JWT });

    try {
      return JSON.stringify(userData['_doc'].data);
    } catch ({ message: error }) {
      throw new ConflictException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error });
    }
  }
}
