import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddress } from './entities/user-address.entity';
import { UserPhone } from './entities/user-phone.entity';
import { UserInfo } from './entities/user-info.entity';
import { User } from './entities/user.entity';
import { UserController } from './controllers/users.controller';
import { UserRepository } from './repositories/users.repository';
import { ReadUserService } from './services/read.service';
import { SharedUserService } from './services/shared.service';
import { CreateUserService } from './services/create.service';
import { HelperUserService } from './services/helper.service';
import { UserInfoRepository } from './repositories/user-info.repository';
import { UserPhoneRepository } from './repositories/user-phone.repository';
import { UserAddressRepository } from './repositories/user-address.repository';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User, UserInfo, UserPhone, UserAddress]),
  ],
  controllers: [UserController],
  providers: [
    ReadUserService,
    SharedUserService,
    CreateUserService,
    UserRepository,
    HelperUserService,
    UserInfoRepository,
    UserPhoneRepository,
    UserAddressRepository,
  ],
  exports: [
    TypeOrmModule,
    ReadUserService,
    SharedUserService,
    CreateUserService,
    HelperUserService,
    UserInfoRepository,
    UserPhoneRepository,
    UserAddressRepository,
  ],
})
export class UserModule {}
