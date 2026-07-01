import { Body, Controller, HttpCode, Get, Req } from '@nestjs/common';
import type { Request } from 'express';
import { CreateUserService } from '../services/create.service';
import { HelperService } from '../../common/services/helper.service';
import { ReadUserService } from '../services/read.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly readUserService: ReadUserService,
    private readonly helperService: HelperService,
  ) {}

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
