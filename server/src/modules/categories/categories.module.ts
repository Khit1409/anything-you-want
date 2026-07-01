import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { categorySchema } from './schemas/categories.schema';

import { CategoryController } from './controllers/categories.controller';
import { ReadCategoryService } from './services/read.service';
import { HelperCategoryService } from './services/helper.service';
import { HelperService } from '../common/services/helper.service';
import { CategoryRepository } from './repositories/categories.repository';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Category', schema: categorySchema }]),
  ],
  controllers: [CategoryController],
  providers: [
    ReadCategoryService,
    HelperCategoryService,
    CategoryRepository,
    HelperService,
  ],
  exports: [
    ReadCategoryService,
    HelperCategoryService,
    CategoryRepository,
    MongooseModule,
  ],
})
export class CategoryModule {}
