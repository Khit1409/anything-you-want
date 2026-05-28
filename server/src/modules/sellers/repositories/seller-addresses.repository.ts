import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellerAddress } from '../entities/seller-address.entity';
import { Repository } from 'typeorm';

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
}
