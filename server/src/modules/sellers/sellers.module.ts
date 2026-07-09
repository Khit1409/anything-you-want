import { Module } from '@nestjs/common';

import { SellerController } from './controllers/sellers.controller';
import { DatabaseModule } from '@/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { SellerPhone } from './entities/seller-phone.entity';
import { SellerInfo } from './entities/seller-info.entity';
import { SellerAddress } from './entities/seller-address.entity';
import { StoreModule } from '../stores/stores.module';
import { ProductModule } from '../products/products.module';
import { SellerRepository } from './repositories/sellers.repository';
import { SellerProductController } from './controllers/seller-products.controller';
import { CreateSellerService } from './services/create.service';
import { SharedSellerService } from './services/shared.service';
import { HelperSellerService } from './services/helper.service';
import { ReadSellerService } from './services/read.service';
import { UserModule } from '../users/users.module';
import { SellerStoreController } from './controllers/seller-store.controller';
import { SellerOrderController } from './controllers/seller-order.controller';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [
    DatabaseModule,
    StoreModule,
    TypeOrmModule.forFeature([Seller, SellerPhone, SellerInfo, SellerAddress]),
    ProductModule,
    UserModule,
    OrdersModule,
  ],
  controllers: [
    SellerController,
    SellerProductController,
    SellerStoreController,
    SellerOrderController,
  ],
  providers: [
    SellerRepository,
    CreateSellerService,
    SharedSellerService,
    HelperSellerService,
    ReadSellerService,
  ],
  exports: [
    TypeOrmModule,
    CreateSellerService,
    SharedSellerService,
    HelperSellerService,
    ReadSellerService,
  ],
})
export class SellerModule {}
