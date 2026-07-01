import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreBankingPaymentConfig } from '../entities/store-banking-config.entity';
import { Repository } from 'typeorm';
import { CreateStoreBankingConfigParams } from './interfaces/store-banking-config-repository.interface';

@Injectable()
export class StoreBankingPaymentConfigRepository {
  constructor(
    @InjectRepository(StoreBankingPaymentConfig)
    private readonly ormRepo: Repository<StoreBankingPaymentConfig>,
  ) {}

  async create(insertData: CreateStoreBankingConfigParams) {
    return await this.ormRepo.save(insertData);
  }

  async getConfig(storeId: string) {
    return await this.ormRepo.findOneBy({ store: { id: storeId } });
  }
}
