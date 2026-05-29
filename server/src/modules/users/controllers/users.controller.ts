import { Body, Controller, Post, HttpCode, Get, Req } from '@nestjs/common';
import { RegisterUserAccountRequestDto } from '../dtos/register.dto';
import type { Request } from 'express';
import { CreateUserService } from '../services/create.service';
import { HelperService } from '../../helpers/helper.service';
import { ReadUserService } from '../services/read.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly readUserService: ReadUserService,
    private readonly helperService: HelperService,
  ) {}

  @HttpCode(201)
  @Post('register')
  async register(@Body() dto: RegisterUserAccountRequestDto) {
    const success = await this.createUserService.create(dto);
    return this.helperService.successResponse({
      message: 'Đăng ký thành công',
      data: { ok: success },
    });
  }

  @HttpCode(200)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const uid = req.userId;
    const profile = await this.readUserService.getProfileById(uid);
    return this.helperService.successResponse({
      message: 'Profile người dùng!',
      data: profile,
    });
  }
}
