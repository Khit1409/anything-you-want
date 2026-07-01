import { Global, Module } from '@nestjs/common';
import { EncryptionService } from './services/encrypt.service';
import { TokenService } from './services/token.service';
import { JwtModule } from '@nestjs/jwt';
import type { StringValue } from 'ms';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HelperService } from './services/helper.service';
import { StrService } from './services/str.service';

@Global()
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
  ],
  providers: [EncryptionService, TokenService, HelperService, StrService],
  exports: [
    EncryptionService,
    TokenService,
    JwtModule,
    HelperService,
    StrService,
  ],
})
export class CommonModule {}
