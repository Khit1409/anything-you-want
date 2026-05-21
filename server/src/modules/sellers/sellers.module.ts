import { Module } from '@nestjs/common';

import { SellerController } from './sellers.controller';
import { SellerService } from './sellers.service';
import { DatabaseModule } from '@/src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { SellerPhone } from './entities/seller-phone.entity';
import { SellerInfo } from './entities/seller-info.entity';
import { SellerAddress } from './entities/seller-address.entity';
import { HttpResponse } from '@/src/helpers/httpResponse';
import { StrHellper } from '@/src/helpers/str.helper';
import { StoreModule } from '../stores/stores.module';
import { ProductModule } from '../products/products.module';
import { SellerRepository } from './sellers.repository';

@Module({
  imports: [
    DatabaseModule,
    StoreModule,
    TypeOrmModule.forFeature([Seller, SellerPhone, SellerInfo, SellerAddress]),
    ProductModule,
  ],
  controllers: [SellerController],
  providers: [SellerService, HttpResponse, StrHellper, SellerRepository],
  exports: [TypeOrmModule, SellerService],
})
export class SellerModule {}
