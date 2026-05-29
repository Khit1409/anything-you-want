import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller, SellerStatus } from '../entities/seller.entity';
import {
  FindOptionsWhere,
  ObjectId,
  QueryDeepPartialEntity,
  Repository,
} from 'typeorm';
import {
  CreateSellerAddressDto,
  CreateSellerInfoDto,
  CreateSellerPhoneDto,
} from '../dtos';
import { UpdateResult } from 'typeorm/browser';
import { CreateStoreDto } from '../../stores/dtos/create-store.dto';
type FilterUpdatetype =
  | string
  | string[]
  | number
  | number[]
  | Date
  | Date[]
  | ObjectId
  | ObjectId[]
  | FindOptionsWhere<Seller>
  | FindOptionsWhere<Seller>[];

type CreateSellerType = {
  addresses: CreateSellerAddressDto[];
  status: SellerStatus;
  emailAddress: string;
  hashPassword: string;
  info: CreateSellerInfoDto;
  phones: CreateSellerPhoneDto[];
  store: CreateStoreDto;
};

@Injectable()
export class SellerRepository {
  constructor(
    @InjectRepository(Seller)
    private readonly ormRepo: Repository<Seller>,
  ) {}

  async findOneById(id: string) {
    return await this.ormRepo.findOne({ where: { id } });
  }

  async findByEmail(emailAddress: string) {
    return await this.ormRepo.findOne({ where: { emailAddress } });
  }

  async findOneByEmail(emailAddress: string) {
    return await this.ormRepo.findOne({ where: { emailAddress } });
  }

  async create(newRaw: CreateSellerType) {
    return await this.ormRepo.save(newRaw);
  }

  async getLastLogin(id: string): Promise<string | undefined> {
    const doc = await this.ormRepo.findOne({
      where: { id },
      select: { lastLoginAt: true },
    });
    return doc?.lastLoginAt.toLocaleDateString('vi-VN');
  }

  async updateLastLogin(id: string, time: string) {
    return await this.ormRepo.update({ id }, { lastLoginAt: time });
  }

  async updateBydId(
    filter: FilterUpdatetype,
    update: QueryDeepPartialEntity<Seller>,
  ): Promise<UpdateResult> {
    return await this.ormRepo.update(filter, update);
  }

  async getById(id: string) {
    return await this.ormRepo.findOne({
      where: { id },
      select: ['id', 'emailAddress', 'lastLoginAt'],
      relations: { info: true },
    });
  }
}
