import { Module } from '@nestjs/common';
import { StoreController } from './stores.controller';
import { StoreService } from './stores.service';
import { StoreRepository } from './stores.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { StoreInfo } from './entities/store-info.entity';
import { DatabaseModule } from '@/src/database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([Store, StoreInfo]), DatabaseModule],
  controllers: [StoreController],
  providers: [StoreService, StoreRepository],
  exports: [TypeOrmModule],
})
export class StoreModule {}
