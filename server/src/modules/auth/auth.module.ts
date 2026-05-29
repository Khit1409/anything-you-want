import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { DatabaseModule } from '@/src/database/database.module';
import { SellerModule } from '../sellers/sellers.module';
import { UserModule } from '../users/users.module';
import { LoginService } from './services/login.service';
import { HelperModule } from '../helpers/helper.module';
import { TokenService } from './services/token.service';
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
    HelperModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LoginService, TokenService],
  exports: [JwtModule, LoginService, TokenService],
})
export class AuthModule {}
