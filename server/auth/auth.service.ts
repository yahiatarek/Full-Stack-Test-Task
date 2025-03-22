import { ConflictException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'users/users.service';
import { CreateUserDto, LoginBody } from 'users/dto/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  logger: Logger = new Logger('auth service');

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService
  ) {}

  private async validateUser(userEmail: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(userEmail);
    if (!user) throw new NotFoundException('User not found');

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(pass, user.password);
    if (passwordMatch) {
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

    // Hash the password before saving
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);

    const userCreated = await this.userService.create(user);
    const result = {
      accessKey: this.jwtService.sign(userCreated, { secret: 'secret' }),
      ...userCreated,
    };
    return {
      message: 'User registered successfully',
      status: HttpStatus.OK,
      ...result,
    };
  }
}
