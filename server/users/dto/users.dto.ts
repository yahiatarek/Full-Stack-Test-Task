import { ApiProperty } from '@nestjs/swagger';

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

export class LoginBody {
  @ApiProperty({ required: true, example: `12345678@a` })
  password: string;
  @ApiProperty({ required: true, example: 'test@test.com' })
  email: string;
}
