import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT') || 'fallback-secret',
        secretOrPrivateKey: configService.get<string>('JWT') || 'fallback-secret',
        signOptions: { expiresIn: '1h' },
      }),
    }),
    UsersModule,
    MongooseModule.forRoot(`mongodb+srv://${process.env.DBNAME}:${process.env.DBPASS}@cluster0.dymtqqc.mongodb.net/Fullstack-task`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
