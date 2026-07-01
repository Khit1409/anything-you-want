import { Module } from '@nestjs/common';
import { StoreController } from './controllers/stores.controller';
import { ReadStoreService } from './services/read.service';
import { StoreRepository } from './repositories/stores.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { StoreInfo } from './entities/store-info.entity';
import { DatabaseModule } from '@/database/database.module';
import { DeleteStoreService } from './services/delete.service';
import { CreateStoreService } from './services/create.service';
import { UpdateStoreService } from './services/update.service';
import { StoreMomoPayment } from './entities/store-momo.entity';
import { StoreBankingPayment } from './entities/store-banking.entity';
import { HelperStoreService } from './services/helper.service';
import { SharedStoreService } from './services/shared.service';
import { StoreBankingPaymentConfigRepository } from './repositories/store-banking-config.repository';
import { StoreBankingPaymentConfig } from './entities/store-banking-config.entity';
import { PayosModule } from '../payos/payos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Store,
      StoreInfo,
      StoreMomoPayment,
      StoreBankingPayment,
      StoreBankingPaymentConfig,
    ]),
    DatabaseModule,
    PayosModule,
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
    StoreBankingPaymentConfigRepository,
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
    StoreBankingPaymentConfigRepository,
  ],
})
export class StoreModule {}
