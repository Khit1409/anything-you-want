import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPhone } from '../entities/user-phone.entity';
import { Repository } from 'typeorm';
import { CreateUserPhoneSaves } from '../interfaces/create.interface';

@Injectable()
export class UserPhoneRepository {
  constructor(
    @InjectRepository(UserPhone)
    private readonly phoneOrm: Repository<UserPhone>,
  ) {}

  async create(data: CreateUserPhoneSaves) {
    return await this.phoneOrm.save(data);
  }
}
