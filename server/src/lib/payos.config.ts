import { ConfigService } from '@nestjs/config';
import { PayOS } from '@payos/node';

export const PayOSProvider = {
  provide: 'PAYOS',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    new PayOS({
      clientId: configService.get<string>('PAYOS_CLIENT_ID')!,
      apiKey: configService.get<string>('PAYOS_API_KEY')!,
      checksumKey: configService.get<string>('PAYOS_CHECKSUM_KEY')!,
    }),
};
