import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { DatabaseModule } from '@/src/database/database.module';
import { ProductService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from './schemas/products.schema';
import { HttpResponse } from '@/src/helpers/httpResponse';
import { ProductRepository } from './products.repository';
import { categorySchema } from '../categories/schemas/categories.schema';
import { CategoryModule } from '../categories/categories.module';
import { CategoryService } from '../categories/categories.service';
import { CategoryRepository } from '../categories/categories.repository';
import { StoreModule } from '../stores/stores.module';
import { StoreService } from '../stores/stores.service';
import { StoreRepository } from '../stores/stores.repository';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: 'Product', schema: productSchema },
      { name: 'Category', schema: categorySchema },
    ]),
    CategoryModule,
    StoreModule,
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    HttpResponse,
    ProductRepository,
    CategoryService,
    CategoryRepository,
    StoreService,
    StoreRepository,
  ],
})
export class ProductModule {}
