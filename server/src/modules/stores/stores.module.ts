import { Module } from '@nestjs/common';
import { StoreController } from './controllers/stores.controller';
import { ReadStoreService } from './services/read.service';
import { StoreRepository } from './stores.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { StoreInfo } from './entities/store-info.entity';
import { DatabaseModule } from '@/src/database/database.module';
import { HelperModule } from '../helpers/helper.module';
import { DeleteStoreService } from './services/delete.service';
import { CreateStoreService } from './services/create.service';
import { UpdateStoreService } from './services/update.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Store, StoreInfo]),
    DatabaseModule,
    HelperModule,
  ],
  controllers: [StoreController],
  providers: [
    ReadStoreService,
    DeleteStoreService,
    CreateStoreService,
    UpdateStoreService,
    StoreRepository,
  ],
  exports: [
    TypeOrmModule,
    ReadStoreService,
    DeleteStoreService,
    CreateStoreService,
    UpdateStoreService,
    StoreRepository,
  ],
})
export class StoreModule {}
