import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAddress } from '../entities/user-address.entity';
import { Repository } from 'typeorm';
import { CreateUserAddressSaves } from '../interfaces/create.interface';

@Injectable()
export class UserAddressRepository {
  constructor(
    @InjectRepository(UserAddress)
    private readonly addressOrm: Repository<UserAddress>,
  ) {}

  async create(data: CreateUserAddressSaves) {
    return await this.addressOrm.save(data);
  }
}
