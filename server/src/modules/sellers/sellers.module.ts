import { Module } from '@nestjs/common';

import { SellerController } from './controllers/sellers.controller';
import { SellerService } from './services/sellers.service';
import { DatabaseModule } from '@/src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { SellerPhone } from './entities/seller-phone.entity';
import { SellerInfo } from './entities/seller-info.entity';
import { SellerAddress } from './entities/seller-address.entity';
import { StoreModule } from '../stores/stores.module';
import { ProductModule } from '../products/products.module';
import { SellerRepository } from './repositories/sellers.repository';
import { SellerProductController } from './controllers/seller-products.controller';
import { HelperModule } from '../helpers/helper.module';

@Module({
  imports: [
    DatabaseModule,
    StoreModule,
    TypeOrmModule.forFeature([Seller, SellerPhone, SellerInfo, SellerAddress]),
    ProductModule,
    HelperModule,
  ],
  controllers: [SellerController, SellerProductController],
  providers: [SellerService, SellerRepository],
  exports: [TypeOrmModule, SellerService],
})
export class SellerModule {}
