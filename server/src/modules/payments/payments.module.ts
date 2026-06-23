import { Module } from '@nestjs/common';
import { PayosModule } from '../payos/payos.module';
import { CreatePaymentService } from './services/create.service';
import { HelperModule } from '../helpers/helper.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PayosModule, HelperModule, ConfigModule],
  providers: [CreatePaymentService],
  controllers: [],
  exports: [CreatePaymentService],
})
export class PaymentsModule {}
