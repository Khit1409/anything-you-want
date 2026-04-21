import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseSeeder } from './database.seeder';
import { productSchema } from '@/src/modules/products/schemas/products.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from '@/src/modules/sellers/entities/seller.entity';
import { User } from '@/src/modules/users/entities/user.entity';
import { DatabaseModule } from '../database.module';
import { ConfigModule } from '@nestjs/config';
import { categorySchema } from '@/src/modules/categories/schemas/categories.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: 'Product', schema: productSchema },
      { name: 'Category', schema: categorySchema },
    ]),
    TypeOrmModule.forFeature([Seller, User]),
  ],
  providers: [DatabaseSeeder],
})
export class SeederModule {}
