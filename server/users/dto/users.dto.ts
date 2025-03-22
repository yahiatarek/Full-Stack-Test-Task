import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
export class CreateUserDto {
  @ApiProperty({ required: true, example: 'Omar' })
  name: string;

  @ApiProperty({ required: true, example: 'Omar.ali@initor.ai' })
  email: string;

  @ApiProperty({ required: true, example: 'P@ssw0rd' })
  password: string;

  @ApiProperty({ required: true, example: 'data' })
  data: string;
}

export class SetPassword {
  @ApiProperty({ required: true, example: 3131 })
  code: string;
  @ApiProperty({ required: true, example: `password` })
  password: string;
  @ApiProperty({ required: true, example: '01234567891' })
  mobile: string;
}
export class UserDataDto {
  @ApiProperty({ required: true, example: 'akjnsdiauhe' })
  token: string;
}

export class LoginBody {
  @ApiProperty({ required: true, example: `12345678@a` })
  password: string;
  @ApiProperty({ required: true, example: 'test@test.com' })
  email: string;
}

export class CreateOwner {
  @ApiProperty({ required: true, example: `password` })
  password: string;
  @ApiProperty({ required: true, example: `test@inar.com` })
  email: string;
  @ApiProperty({ required: true, example: '01234567891' })
  mobile: string;
  @ApiProperty({ required: true, example: `Jone Doe` })
  fullname: string;
  @ApiProperty({ required: true, example: `Inar` })
  organizationName: string;
}

export class ParticipatePatient {
  @ApiProperty({ required: true, example: '01234567891' })
  mobile: string;
  @ApiProperty({ required: true, example: `Jone Doe` })
  fullname: string;
  @ApiProperty({ required: true })
  organizationId: Types.ObjectId;
}
