import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoreRepository {
  constructor(
    @InjectRepository(Store) private readonly ormRepo: Repository<Store>,
  ) {}

  async getOneBySellerId(sellerId: string) {
    const store = await this.ormRepo.findOne({
      where: { seller: { id: sellerId } },
    });
    return store;
  }

  async getOneStoreEmail(email: string) {
    return await this.ormRepo.findOne({
      where: { info: { emailAddress: email } },
    });
  }

  async getOneBySellerEmail(sellerEmail: string) {
    return await this.ormRepo.findOne({
      where: { seller: { emailAddress: sellerEmail } },
    });
  }

  async getOneBySlugName(slug: string) {
    return await this.ormRepo.findOne({
      where: { info: { slug } },
    });
  }

  async getOneById(id: string) {
    return await this.ormRepo.findOne({ where: { id } });
  }

  async getInfoById(id: string) {
    const orm = await this.ormRepo.findOne({ where: { id } });
    return orm?.info;
  }

  async deleteBySellerId(sellerId: string) {
    return await this.ormRepo.delete({ seller: { id: sellerId } });
  }

  async deleteById(id: string) {
    return await this.ormRepo.delete({ id });
  }

  async deleteBySellerEmail(sellerEmail: string) {
    return await this.ormRepo.delete({ seller: { emailAddress: sellerEmail } });
  }
}
