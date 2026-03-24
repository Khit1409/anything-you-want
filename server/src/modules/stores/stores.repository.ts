import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoreRepository {
  constructor(
    @InjectRepository(Store) private readonly ormRepo: Repository<Store>,
  ) {}
  /**
   *
   * @param sellerId
   * @returns
   */
  async getStoreBySellerId(sellerId: string) {
    const store = await this.ormRepo.findOne({
      where: { seller: { id: sellerId } },
    });
    return store;
  }
  /**
   * get store by email address.
   *@param email
   *@returns
   */
  async getByStoreEmail(email: string) {
    return await this.ormRepo.findOne({
      where: { info: { emailAddress: email } },
    });
  }
}
