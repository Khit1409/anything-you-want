import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

import { CreateUserSave } from '../interfaces/create.interface';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly ormRepo: Repository<User>,
  ) {}

  async findByEmail(emailAddress: string) {
    return await this.ormRepo.findOne({ where: { emailAddress } });
  }

  async findById(id: string) {
    return await this.ormRepo.findOne({ where: { id } });
  }

  async create(data: CreateUserSave) {
    return await this.ormRepo.save(data);
  }

  async getProfile(id: string) {
    return await this.ormRepo.findOne({
      where: { id },
      select: ['id', 'emailAddress', 'lastLoginAt', 'status', 'createdAt'],
      relations: {
        info: true,
        addresses: true,
        phones: true,
      },
    });
  }
}
