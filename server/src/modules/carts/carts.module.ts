import { Module } from '@nestjs/common';
import { CartController } from './controllers/carts.controller';
import { DatabaseModule } from '@/src/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { cartSchema } from './schemas/carts.schema';

import { CartRepository } from './repositories/carts.repository';

import { ProductModule } from '../products/products.module';
import { CategoryModule } from '../categories/categories.module';
import { ReadCartService } from './services/read.service';
import { UpdateCartService } from './services/update.service';
import { CreateCartService } from './services/create.service';
import { DeleteCartService } from './services/delete.service';
import { HelperModule } from '../helpers/helper.module';
import { CartMapper } from './mappers/response.mapper';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Cart', schema: cartSchema }]),
    ProductModule,
    CategoryModule,
    HelperModule,
  ],
  controllers: [CartController],
  providers: [
    ReadCartService,
    UpdateCartService,
    CreateCartService,
    DeleteCartService,
    CartRepository,
    CartMapper,
  ],
  exports: [
    ReadCartService,
    UpdateCartService,
    CreateCartService,
    DeleteCartService,
    CartRepository,
    MongooseModule,
  ],
})
export class CartModule {}
