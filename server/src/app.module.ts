import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT,
      secret: process.env.JWT,
    }),
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DBNAME}:${process.env.DBPASS}@cluster0.dymtqqc.mongodb.net/Fullstack-task`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
