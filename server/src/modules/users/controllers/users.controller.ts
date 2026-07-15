import { Body, Controller, HttpCode, Get, Req, Post } from '@nestjs/common';
import type { Request } from 'express';
import { CreateUserService } from '../services/create.service';
import { HelperService } from '../../common/services/helper.service';
import { ReadUserService } from '../services/read.service';
import {
  CreateUserInfoDto,
  CreateUserAddressDto,
  CreateUserPhoneDto,
} from '../dtos/register.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly readUserService: ReadUserService,
    private readonly helperService: HelperService,
  ) {}

  @HttpCode(200)
  @Post('info')
  async createInfo(@Req() req: Request, @Body() dto: CreateUserInfoDto) {
    const userId = req.userId;
    await this.createUserService.createUserInfo(userId, dto);
    return this.helperService.successResponse({
      message:
        'Tạo thành công thông tin người dùng, vui lòng tới bước tiếp theo!',
    });
  }
  @HttpCode(200)
  @Post('phones')
  async createPhones(@Req() req: Request, @Body() dto: CreateUserPhoneDto[]) {
    const userId = req.userId;
    await this.createUserService.createUserPhones(userId, dto);
    return this.helperService.successResponse({
      message:
        'Tạo thành công thông tin liên lạc, vui lòng tới bước tiếp theo!',
    });
  }
  @HttpCode(200)
  @Post('addresses')
  async createAddresses(
    @Req() req: Request,
    @Body() dto: CreateUserAddressDto[],
  ) {
    const userId = req.userId;
    await this.createUserService.createUserAddresses(userId, dto);
    return this.helperService.successResponse({
      message: 'Tạo thành công thông tin địa chỉ!',
    });
  }

  @HttpCode(200)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const uid = req.userId;
    console.log('user get profile: ', uid);
    //
    const profile = await this.readUserService.getProfileById(uid);
    return this.helperService.successResponse({
      message: 'Profile người dùng!',
      data: profile,
    });
  }
}
