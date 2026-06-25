import { Module } from '@nestjs/common';
import { StoreController } from './controllers/stores.controller';
import { ReadStoreService } from './services/read.service';
import { StoreRepository } from './repositories/stores.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { StoreInfo } from './entities/store-info.entity';
import { DatabaseModule } from '@/src/database/database.module';
import { HelperModule } from '../helpers/helper.module';
import { DeleteStoreService } from './services/delete.service';
import { CreateStoreService } from './services/create.service';
import { UpdateStoreService } from './services/update.service';
import { StoreMomoPayment } from './entities/store-momo.entity';
import { StoreBankingPayment } from './entities/store-banking.entity';
import { HelperStoreService } from './services/helper.service';
import { SharedStoreService } from './services/shared.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Store,
      StoreInfo,
      StoreMomoPayment,
      StoreBankingPayment,
    ]),
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
    HelperStoreService,
    SharedStoreService,
  ],
  exports: [
    TypeOrmModule,
    ReadStoreService,
    DeleteStoreService,
    CreateStoreService,
    UpdateStoreService,
    StoreRepository,
    HelperStoreService,
    SharedStoreService,
  ],
})
export class StoreModule {}
