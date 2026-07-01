import { Global, Module } from '@nestjs/common';
import { PayosModule } from '../payos/payos.module';

import { ConfigModule } from '@nestjs/config';
import { StoreModule } from '../stores/stores.module';
import { OrdersModule } from '../orders/orders.module';
import { PaymentService } from './services/payment.service';
import { ProductModule } from '../products/products.module';
import { PaymentController } from './controllers/payment.controller';
@Global()
@Module({
  imports: [
    PayosModule,
    ConfigModule,
    StoreModule,
    OrdersModule,
    ProductModule,
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentsModule {}
