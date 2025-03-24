// auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'users/users.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService, @InjectModel('USER_MODEL')
      private UserModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // expects "Bearer <token>"
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT') || 'fallback-secret',
    });
  }

  async validate(payload: User) {
    const {id} = payload

    const user = await this.UserModel.findById(id)

    if(!user) {
      throw new UnauthorizedException('Unauthorized user')
    }

    return user
  }
}
