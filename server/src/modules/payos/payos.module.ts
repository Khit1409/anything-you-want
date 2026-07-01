import { Module } from '@nestjs/common';
import { PayosService } from './services/payos.service';

@Module({
  providers: [PayosService],
  exports: [PayosService],
})
export class PayosModule {}
