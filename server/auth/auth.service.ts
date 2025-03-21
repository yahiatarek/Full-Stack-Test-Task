import { ConflictException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'users/users.model';
import { Model } from 'mongoose';
import { UsersService } from 'users/users.service';
import { CreateUserDto, LoginBody } from 'users/dto/users.dto';

@Injectable()
export class AuthService {
  logger: Logger = new Logger('auth service');

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService
  ) {}

  private async validateUser(userEmail: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(userEmail);
    if (!user) throw new NotFoundException();
    if (user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    throw new ConflictException({ status: HttpStatus.UNAUTHORIZED, error: `the password dosn't match ..!` });
  }

  async login({ email, password }: LoginBody) {
    const payload = await this.validateUser(email, password);

    const result = {
      ...payload,
      accessKey: this.jwtService.sign(payload, { secret: 'secret' }),
    };
    return {
      message: 'User signed in successfully',
      status: HttpStatus.OK,
      ...result,
    };
  }

  async signup(user: CreateUserDto) {
    if (Boolean(await this.userService.findOne(user.email))) {
      throw new ConflictException('User already exists');
    }

    const userCreated = await this.userService.create(user);
    const result = {
      accessKey: this.jwtService.sign(userCreated, { secret: 'secret' }),
      userCreated,
    };
    return {
      message: 'User registered successfully',
      status: HttpStatus.OK,
      ...result,
    };
  }
}
