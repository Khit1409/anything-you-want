import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { HelperService } from '../../common/services/helper.service';
import { CreateConfigBankingDto } from '../../stores/dtos/create-banking-config.dto';
import type { Request } from 'express';
import { CreateStoreService } from '../../stores/services/create.service';
import { IsSeller } from '@/shared/decorators/roles.decorator';

@IsSeller()
@Controller('sellers/stores')
export class SellerStoreController {
  constructor(
    private readonly helperService: HelperService,
    private readonly createStoreService: CreateStoreService,
  ) {}

  @HttpCode(200)
  @Post('banking')
  async createBankingConfig(
    @Body() dto: CreateConfigBankingDto,
    @Req() req: Request,
  ) {
    const sellerId = req.userId;
    await this.createStoreService.createConfigBanking(dto, sellerId);

    return this.helperService.successResponse({
      message: 'Tạo thành công cấu hình thanh toán chuyển khoản ngân hàng!',
    });
  }
}
