import { Module } from '@nestjs/common';
import { ProductController } from './controllers/products.controller';
import { DatabaseModule } from '@/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from './schemas/products.schema';
import { CategoryModule } from '../categories/categories.module';
import { StoreModule } from '../stores/stores.module';
import { UploadModule } from '../uploads/upload.module';
import { ProductMapper } from './mappers/response.mapper';
import { ProductRepository } from './repositories/products.repository';
import { SharedProductService } from './services/shared.service';
import { CreateProductService } from './services/create.service';
import { UpdateProductService } from './services/update.service';
import { DeleteProductService } from './services/delete.service';
import { ReadProductService } from './services/read.service';
import { HelperProductService } from './services/helper.service';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Product', schema: productSchema }]),
    CategoryModule,
    StoreModule,
    UploadModule,
  ],
  controllers: [ProductController],
  providers: [
    ProductRepository,
    ProductMapper,
    SharedProductService,
    CreateProductService,
    UpdateProductService,
    DeleteProductService,
    ReadProductService,
    HelperProductService,
  ],
  exports: [
    ProductRepository,
    HelperProductService,
    MongooseModule,
    ProductMapper,
    SharedProductService,
    CreateProductService,
    UpdateProductService,
    DeleteProductService,
    ReadProductService,
  ],
})
export class ProductModule {}
