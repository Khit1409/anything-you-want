import { Body, Controller, Post, HttpCode, Get, Req } from '@nestjs/common';
import { UserService } from './users.service';
import { RegisterUserAccountRequestDto } from './dto/register.dto';
import type { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  // ============================================================================
  // CREATE ENDPOINTS
  // ============================================================================

  /**
   * Đăng ký tài khoản người dùng mới
   * @param dto - Dữ liệu đăng ký (email, mật khẩu, thông tin cá nhân)
   * @returns Response thông báo đăng ký thành công
   */
  @HttpCode(201)
  @Post('register')
  async register(@Body() dto: RegisterUserAccountRequestDto) {
    return await this.service.register(dto);
  }

  // ============================================================================
  // READ ENDPOINTS
  // ============================================================================

  /**
   * Lấy thông tin hồ sơ người dùng (yêu cầu xác thực)
   * @param req - Request object chứa userId
   * @returns Response chứa thông tin hồ sơ người dùng
   */
  @HttpCode(200)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const uid = req.userId;
    return await this.service.getInfo(uid);
  }
}
