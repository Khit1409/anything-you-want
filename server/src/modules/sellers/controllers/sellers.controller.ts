import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BecomeSellerDto, CreateSellerDto } from '../dtos';
import type { Request } from 'express';
import { Role } from '@/src/common/enums/roles.enum';
import { Roles } from '@/src/common/decorators/roles.decorator';
import { RolesGuard } from '@/src/guards/role.guard';
import { AuthGuard } from '@/src/guards/auth.guard';
import { HelperService } from '../../helpers/helper.service';
import { CreateSellerService } from '../services/create.service';
import { ReadSellerService } from '../services/read.service';

@Controller('sellers')
export class SellerController {
  constructor(
    private readonly createService: CreateSellerService,
    private readonly readService: ReadSellerService,

    private readonly helperService: HelperService,
  ) {}

  // ============================================================================
  // CREATE ENDPOINTS
  // ============================================================================

  /**
   * Đăng ký người bán mới
   * @param dto - Dữ liệu đăng ký (thông tin cá nhân, cửa hàng, mật khẩu)
   * @returns Response thông báo đăng ký thành công
   */
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() dto: CreateSellerDto) {
    await this.createService.create(dto);
    return this.helperService.successResponse({
      message: 'Đăng ký thành công!',
    });
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('become-seller')
  async becomeSeller(@Body() dto: BecomeSellerDto) {
    await this.createService.become(dto);
    return this.helperService.successResponse({
      message: 'Đăng ký thành công!',
    });
  }

  // ============================================================================
  // READ ENDPOINTS
  // ============================================================================

  /**
   * Lấy hồ sơ người bán hiện tại (yêu cầu xác thực)
   * @param req - Request object chứa userId
   * @returns Response chứa thông tin hồ sơ người bán
   */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SELLER)
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
