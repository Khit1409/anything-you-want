import { Body, Controller, Get, Req } from '@nestjs/common';
import type { Request } from 'express';

import { HelperService } from '../../common/services/helper.service';
import { CreateSellerService } from '../services/create.service';
import { ReadSellerService } from '../services/read.service';
import { IsSeller } from '@/shared/decorators/roles.decorator';

@IsSeller()
@Controller('sellers')
export class SellerController {
  constructor(
    private readonly createService: CreateSellerService,
    private readonly readService: ReadSellerService,

    private readonly helperService: HelperService,
  ) {}

  @Get('profile')
  async getProfile(@Req() req: Request) {
    const id = req.userId;
    const api = await this.readService.getProfileById(id);
    return this.helperService.successResponse({
      message: 'Dữ liệu thông tin người dùng!',
      data: api,
    });
  }
}
