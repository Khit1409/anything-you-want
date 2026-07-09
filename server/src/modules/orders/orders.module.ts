import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { CreateOrderService } from './services/create.service';
import { ProductModule } from '../products/products.module';
import { DatabaseModule } from '@/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderShipping } from './entities/order-shipping.entity';
import { OrderAddress } from './entities/order-address.entity';
import { OrderContact } from './entities/order-contact.entity';
import { OrderPayment } from './entities/order-payment.entity';
import { OrderRepository } from './repositories/order.repository';
import { StoreModule } from '../stores/stores.module';
import { SharedOrderService } from './services/shared.service';
import { HelperOrderService } from './services/helper.service';
import { ReadOrderService } from './services/read.service';
import { OrderPaymentRepository } from './repositories/order-payment.repository';
import { DeleteOrderService } from './services/delete.service';

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
    StoreModule,
  ],
  controllers: [OrdersController],
  providers: [
    CreateOrderService,
    OrderRepository,
    SharedOrderService,
    HelperOrderService,
    ReadOrderService,
    OrderPaymentRepository,
    DeleteOrderService,
    ReadOrderService,
  ],
  exports: [
    TypeOrmModule,
    CreateOrderService,
    OrderRepository,
    SharedOrderService,
    HelperOrderService,
    ReadOrderService,
    OrderPaymentRepository,
    DeleteOrderService,
    ReadOrderService,
  ],
})
export class OrdersModule {}
