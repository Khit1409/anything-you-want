import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from '../entities/user-info.entity';
import { Repository } from 'typeorm';
import { CreateUserInfoSave } from '../interfaces/create.interface';

@Injectable()
export class UserInfoRepository {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfoOrm: Repository<UserInfo>,
  ) {}

  async create(data: CreateUserInfoSave) {
    return await this.userInfoOrm.save(data);
  }
}
