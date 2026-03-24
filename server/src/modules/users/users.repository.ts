import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { User, UserStatus } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserAccountRequestDto } from '../auth/dto/auth.request.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly ormRepo: Repository<User>,
  ) {}

  /**
   *
   * @param emailAddress
   * @returns
   */
  async findByEmail(emailAddress: string) {
    return await this.ormRepo.findOne({ where: { emailAddress } });
  }
  /**
   *
   * @param id
   * @returns
   */
  async findById(id: string) {
    return await this.ormRepo.findOne({ where: { id } });
  }
  /**
   *
   * @param dto
   * @returns
   */
  async create(dto: RegisterUserAccountRequestDto) {
    const {
      address,
      currentPassword,
      dateOfBirth,
      emailAddress,
      firstName,
      fullName,
      lastName,
      phones,
    } = dto;

    const hashPassword = await bcrypt.hash(currentPassword, 10);
    const newUser = this.ormRepo.create({
      emailAddress,
      hashPassword,
      status: UserStatus.ACTIVE,

      info: {
        dateOfBirth: new Date(dateOfBirth),
        firstName,
        lastName,
        fullName,
      },

      addresses: address.map((a) => ({
        province: a.province,
        ward: a.ward,
        addressDetail: a.addressDetail,
      })),

      phones: phones.map((p) => ({
        phoneNumber: p.phoneNumber,
      })),
    });

    const created = await this.ormRepo.save(newUser);
    return created;
  }
  /**
   *
   * @param id
   * @returns
   */
  async getInfo(id: string) {
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
