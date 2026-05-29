import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellerInfo } from '../entities/seller-info.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SellerInfoRepository {
  constructor(
    @InjectRepository(SellerInfo)
    private readonly ormRepo: Repository<SellerInfo>,
  ) {}

  async getOneBySellerId(sellerId: string) {
    return await this.ormRepo.findOne({ where: { seller: { id: sellerId } } });
  }

  async getOneById(id: string) {
    return await this.ormRepo.findOne({ where: { id } });
  }

  async getOneByFullName(fullName: string) {
    return await this.ormRepo.findOne({ where: { fullName } });
  }

  async getManyByFullName(fullName: string) {
    return await this.ormRepo.find({ where: { fullName } });
  }

  async getManyByLastName(lastName: string) {
    return await this.ormRepo.find({ where: { lastName } });
  }

  async getOneByFirstName(firstName: string) {
    return await this.ormRepo.findOne({ where: { firstName } });
  }

  async getManyByFirstName(firstName: string) {
    return await this.ormRepo.find({ where: { firstName } });
  }

  async getOneByDateOfBirth(dob: Date) {
    return await this.ormRepo.findOne({ where: { dateOfBirth: dob } });
  }
  async getManyByDateOfBirth(dob: Date) {
    return await this.ormRepo.find({ where: { dateOfBirth: dob } });
  }
}
