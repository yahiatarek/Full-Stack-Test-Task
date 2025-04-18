import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/users.dto';
import { User } from './users.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  logger: Logger = new Logger('user service');

  constructor(
    @InjectModel('USER_MODEL')
    private UserModel: Model<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.UserModel(createUserDto);
    const savedUser = (await createdUser.save()).toObject();
    return savedUser;
  }

  async findOne(userEmail: string): Promise<User | undefined> {
    return this.UserModel.find({ email: userEmail }).findOne({ email: userEmail });
  }
}
