import { Body, ConflictException, Controller, Get, HttpStatus, Post } from '@nestjs/common';

import { UserDataDto } from '../users/dto/users.dto';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class UserController {
  constructor(private readonly jwtService: JwtService) {}

  @Post('data')
  async getUserData(@Body() Body: UserDataDto) {
    const userData = this.jwtService.verify(Body.token, { secret: 'secret' });

    try {
      return JSON.stringify(userData['_doc'].data);
    } catch ({ message: error }) {
      throw new ConflictException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error });
    }
  }
}
