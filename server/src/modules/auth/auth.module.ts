import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '@/src/database/database.module';
import { HttpResponse } from '@/src/helpers/httpResponse';
import { SellerRepository } from '../sellers/sellers.repository';
import { UserRepository } from '../users/users.repository';
import { SellerModule } from '../sellers/sellers.module';
import { UserModule } from '../users/users.module';
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<StringValue>('JWT_EXPIRES_IN') ?? '1d',
          algorithm: 'HS256',
        },
      }),
    }),
    DatabaseModule,
    SellerModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, HttpResponse, SellerRepository, UserRepository],
  exports: [JwtModule],
})
export class AuthModule {}
