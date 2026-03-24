import { Body, Controller, Post, HttpCode, Get, Req } from '@nestjs/common';
import { UserService } from './users.service';
import { RegisterUserAccountRequestDto } from '../auth/dto/auth.request.dto';
import type { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @HttpCode(201)
  @Post('register')
  async register(@Body() dto: RegisterUserAccountRequestDto) {
    return await this.service.register(dto);
  }

  @HttpCode(200)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const uid = req.userId;
    return await this.service.getInfo(uid);
  }
}
