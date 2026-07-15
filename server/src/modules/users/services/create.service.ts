import { BadRequestException, Injectable } from '@nestjs/common';
import { HelperService } from '../../common/services/helper.service';
import { UserRepository } from '../repositories/users.repository';
import {
  CreateUserDto,
  CreateUserInfoDto,
  CreateUserAddressDto,
  CreateUserPhoneDto,
} from '../dtos/register.dto';
import { HelperUserService } from './helper.service';
import bcrypt from 'node_modules/bcryptjs';
import {
  CreateUserAddressSaves,
  CreateUserInfoSave,
  CreateUserPhoneSaves,
  CreateUserSave,
} from '../interfaces/create.interface';
import { UserStatus } from '../entities/user.entity';
import { TokenService } from '@/modules/common/services/token.service';
import { TokenPayloadType } from '@/modules/auth/interfaces/token.interface';
import { Role } from '@/shared/enums/roles.enum';
import { UserInfoRepository } from '../repositories/user-info.repository';
import { UserPhoneRepository } from '../repositories/user-phone.repository';
import { UserAddressRepository } from '../repositories/user-address.repository';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly helperService: HelperService,
    private readonly repository: UserRepository,
    private readonly helperUserService: HelperUserService,
    private readonly tokenService: TokenService,
    private readonly userInfoRepository: UserInfoRepository,
    private readonly userPhoneRepository: UserPhoneRepository,
    private readonly userAddressRepository: UserAddressRepository,
  ) {}

  async createUser(role: Role, dto: CreateUserDto) {
    const { currentPassword, emailAddress } = dto;
    const existing = await this.helperUserService.checkExistingUser({
      emailAddress,
    });

    if (existing) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Người dùng với email tồn tại!',
        }),
      );
    }
    const hashPassword = await bcrypt.hash(currentPassword, 12);
    const status = UserStatus.ACTIVE;
    const insertData: CreateUserSave = { hashPassword, emailAddress, status };
    const newUser = await this.repository.create(insertData);
    const tokenPayload: TokenPayloadType = {
      email: emailAddress,
      role,
      uid: newUser.id,
    };
    return await this.tokenService.createLoginToken(tokenPayload);
  }

  async createUserInfo(userId: string, dto: CreateUserInfoDto) {
    const user = { id: userId };
    const { firstName, fullName, lastName, avatar } = dto;
    const dateOfBirth = new Date(dto.dateOfBirth);
    const dataInsert: CreateUserInfoSave = {
      user,
      dateOfBirth,
      firstName,
      lastName,
      fullName,
      avatar,
    };
    return await this.userInfoRepository.create(dataInsert);
  }

  async createUserPhones(userId: string, dto: CreateUserPhoneDto[]) {
    const dataInserts: CreateUserPhoneSaves = dto.map((phone) => ({
      user: { id: userId },
      ...phone,
    }));
    return await this.userPhoneRepository.create(dataInserts);
  }

  async createUserAddresses(userId: string, dto: CreateUserAddressDto[]) {
    const dataInserts: CreateUserAddressSaves = dto.map((address) => ({
      user: { id: userId },
      ...address,
    }));
    return await this.userAddressRepository.create(dataInserts);
  }
}
