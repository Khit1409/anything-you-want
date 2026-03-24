import { Module } from '@nestjs/common';
import { CartService } from './carts.service';
import { CartController } from './carts.controller';
import { DatabaseModule } from '@/src/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { cartSchema } from './schemas/carts.schema';
import { productSchema } from '../products/schemas/products.schema';
import { CartRepository } from './carts.repository';
import { HttpResponse } from '@/src/helpers/httpResponse';
import { ProductRepository } from '../products/products.repository';
import { categorySchema } from '../categories/schemas/categories.schema';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: 'Cart', schema: cartSchema },
      { name: 'Product', schema: productSchema },
      { name: 'Category', schema: categorySchema },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService, HttpResponse, CartRepository, ProductRepository],
})
export class CartModule {}
