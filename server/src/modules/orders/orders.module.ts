import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { CreateOrderService } from './services/create.service';
import { ProductModule } from '../products/products.module';
import { DatabaseModule } from '@/src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderShipping } from './entities/order-shipping.entity';
import { OrderAddress } from './entities/order-address.entity';
import { OrderContact } from './entities/order-contact.entity';
import { OrderPayment } from './entities/order-payment.entity';
import { PaymentsModule } from '../payments/payments.module';
import { OrderRepository } from './repositories/order.repository';
import { HelperModule } from '../helpers/helper.module';

@Module({
  imports: [
    ProductModule,
    DatabaseModule,
    TypeOrmModule.forFeature([
      Order,
      OrderShipping,
      OrderAddress,
      OrderContact,
      OrderPayment,
    ]),
    PaymentsModule,
    HelperModule,
  ],
  controllers: [OrdersController],
  providers: [CreateOrderService, OrderRepository],
  exports: [TypeOrmModule, CreateOrderService, OrderRepository],
})
export class OrdersModule {}
