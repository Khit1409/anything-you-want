import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller, SellerStatus } from './entities/seller.entity';
import { Repository } from 'typeorm';
import { CreateSellerDto } from './dto/create-seller.dto';

@Injectable()
export class SellerRepository {
  constructor(
    @InjectRepository(Seller)
    private readonly ormRepo: Repository<Seller>,
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

  /**
   * @param id
   * @returns
   */
  async getById(id: string) {
    return await this.ormRepo.findOne({
      where: { id },
      select: ['id', 'emailAddress', 'lastLoginAt'],
      relations: { info: true },
    });
  }
}
