import { Module } from '@nestjs/common';

import { SellerController } from './controllers/sellers.controller';
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
import { CreateSellerService } from './services/create.service';
import { SharedSellerService } from './services/shared.service';
import { HelperSellerService } from './services/helper.service';
import { ReadSellerService } from './services/read.service';

@Module({
  imports: [
    DatabaseModule,
    StoreModule,
    TypeOrmModule.forFeature([Seller, SellerPhone, SellerInfo, SellerAddress]),
    ProductModule,
    HelperModule,
  ],
  controllers: [SellerController, SellerProductController],
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
