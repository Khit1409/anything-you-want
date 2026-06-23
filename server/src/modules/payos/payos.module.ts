import { PayOSProvider } from '@/src/lib/payos.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [PayOSProvider, ConfigModule],
  exports: [PayOSProvider],
})
export class PayosModule {}
