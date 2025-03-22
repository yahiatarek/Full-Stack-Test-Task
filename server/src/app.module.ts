import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secretOrPrivateKey: 'secret',
      secret: 'secret',
    }),
    UsersModule,
    MongooseModule.forRoot('mongodb+srv://yahiayt:e9uA9QIR7gG4ZZBv@cluster0.dymtqqc.mongodb.net/Fullstack-task'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
