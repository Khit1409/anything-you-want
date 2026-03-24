import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellerAddress } from './entities/seller-address.entity';
import { Repository } from 'typeorm';
import { CreateSellerAddressDto } from './dto/create-seller.dto';

@Injectable()
export class SellerAddressesRepository {
  constructor(
    @InjectRepository(SellerAddress)
    private readonly ormRepo: Repository<SellerAddress>,
  ) {}
  /**
   *
   * @param data
   * @returns
   */
  async create(data: CreateSellerAddressDto[], sellerId: string) {
    const newData = this.ormRepo.create(data);
  }
}
