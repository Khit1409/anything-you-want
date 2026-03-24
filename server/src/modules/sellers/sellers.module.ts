import { Module } from '@nestjs/common';
import { SellerRepository } from './sellers.repository';
import { SellerController } from './sellers.controller';
import { SellerService } from './sellers.service';
import { DatabaseModule } from '@/src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from '../products/schemas/products.schema';
import { categorySchema } from '../categories/schemas/categories.schema';
import { SellerPhone } from './entities/seller-phone.entity';
import { SellerInfo } from './entities/seller-info.entity';
import { SellerAddress } from './entities/seller-address.entity';
import { HttpResponse } from '@/src/helpers/httpResponse';
import { StrHellper } from '@/src/helpers/str.helper';
import { StoreService } from '../stores/stores.service';
import { StoreModule } from '../stores/stores.module';
import { StoreRepository } from '../stores/stores.repository';

@Module({
  imports: [
    DatabaseModule,
    StoreModule,
    TypeOrmModule.forFeature([Seller, SellerPhone, SellerInfo, SellerAddress]),
    MongooseModule.forFeature([
      { name: 'Product', schema: productSchema },
      { name: 'Category', schema: categorySchema },
    ]),
  ],
  controllers: [SellerController],
  providers: [
    SellerRepository,
    SellerService,
    HttpResponse,
    StrHellper,
    StoreService,
    StoreRepository,
  ],
  exports: [TypeOrmModule],
})
export class SellerModule {}
