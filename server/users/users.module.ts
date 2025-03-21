import { Module } from '@nestjs/common';

import { UsersService } from './Users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.schema';

const USER_MODEL = MongooseModule.forFeature([{ name: 'USER_MODEL', schema: UserSchema }]);

@Module({
  imports: [USER_MODEL],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService, USER_MODEL],
})
export class UsersModule {}
