import { Body, ConflictException, Controller, Get, HttpStatus, Logger, Post, Req, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';

@Controller()
export class UserController {
  logger: Logger = new Logger('user service');

  constructor(private readonly jwtService: JwtService) {}

  @ApiOperation({ summary: 'get user data' })
  @Get('data')
  async getUserData(@Req() req: Request) {
  const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }

      // Expect header to be in the format: "Bearer <token>"
    const token = authHeader.split(' ')[1] || authHeader;
    
    try {
      // Verify and decode the token using your secret
      const userData = this.jwtService.verify(token, { secret: process.env.JWT });
      return JSON.stringify(userData['_doc'].data);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
