import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller, SellerStatus } from './entities/seller.entity';
import { Repository } from 'typeorm';
import { SellerInfo } from './entities/seller-info.entity';
import { SellerPhone } from './entities/seller-phone.entity';
import { SellerAddress } from './entities/seller-address.entity';
import { CreateSellerDto } from './dto/create-seller.dto';

@Injectable()
export class SellerRepository {
  constructor(
    @InjectRepository(Seller)
    private readonly ormRepo: Repository<Seller>,
    @InjectRepository(SellerInfo)
    private readonly infoOrmRepo: Repository<SellerInfo>,
    @InjectRepository(SellerPhone)
    private readonly phoneOrmRepo: Repository<SellerPhone>,
    @InjectRepository(SellerAddress)
    private readonly addressOrmRepo: Repository<SellerAddress>,
  ) {}

  /**
   * Get seller by email address
   * @param emailAddress
   * @returns
   */
  async findByEmail(emailAddress: string) {
    return await this.ormRepo.findOne({ where: { emailAddress } });
  }
  /**
   * create authentication for seller (email and password for login).
   * @param data
   * @param hashPassword
   * @returns
   */
  async create(data: CreateSellerDto, hashPassword: string) {
    const { addresses, emailAddress, info, phones, store } = data;

    const newRaw = this.ormRepo.create({
      info,
      phones,
      addresses,
      emailAddress,
      hashPassword,
      status: SellerStatus.ACTIVE,
      store,
    });

    return await this.ormRepo.save(newRaw);
  }
}
