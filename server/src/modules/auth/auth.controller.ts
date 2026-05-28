import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/auth.request.dto';
import { RoleDto } from '../common/dto/response.common.dto';
import { CookieMap } from '@/src/interfaces/cookies.interface';
import { authCookieConfig } from '@/src/lib/cookie.config';
import { HttpResponse } from '@/src/helpers/httpResponse';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly httpHelper: HttpResponse,
  ) {}

  // ============================================================================
  // LOGIN ENDPOINTS
  // ============================================================================

  /**
   * Đăng nhập (hỗ trợ cả khách hàng và người bán)
   * Endpoint sẽ gọi sellerLogin hoặc clientLogin dựa trên loginRole
   * @param dto - Dữ liệu đăng nhập (emailAddress, currentPassword, loginRole)
   * @param res - Response object để set cookie
   * @returns Response chứa token, message, success, timestamp
   */
  @HttpCode(200)
  @Post('login')
  async login(
    @Body() dto: LoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (dto.loginRole === RoleDto.SELLER) {
      const result = await this.authService.sellerLogin(dto);
      const { token, data } = result;
      res.cookie('access_token', token, authCookieConfig);
      return this.httpHelper.success('Đăng nhập thành công!', data);
    }

    const result = await this.authService.clientLogin(dto);
    const { token, data } = result;
    res.cookie('access_token', token, authCookieConfig);
    return this.httpHelper.success('Đăng nhập thành công!', data);
  }

  // ============================================================================
  // AUTHENTICATION ENDPOINTS
  // ============================================================================

  /**
   * Lấy thông tin xác thực hiện tại của người dùng
   * Yêu cầu token hợp lệ trong cookies
   * @param req - Request object chứa cookies và thông tin xác thực
   * @returns Response chứa thông tin xác thực (uid, role, email)
   */
  @HttpCode(200)
  @Get('me')
  async auth(@Req() req: Request) {
    const result = await this.authService.clientAuth(req);
    const { email, role, uid } = result;

    return this.httpHelper.success('Xác thực người dùng thành công!', {
      email,
      role,
      uid,
    });
  }

  /**
   * Kiểm tra dữ liệu xác thực từ request
   * Debug endpoint để lấy dữ liệu xác thực từ middleware
   * @param req - Request object
   * @returns Dữ liệu xác thực hoặc thông báo không có dữ liệu
   */
  @Get('')
  checkAuthenticationData(req: Request) {
    const logData = req.user;
    return logData ?? 'Không có dữ liệu xác thực!';
  }

  // ============================================================================
  // LOGOUT ENDPOINTS
  // ============================================================================

  /**
   * Đăng xuất người dùng
   * Xóa token từ cookies
   * @param req - Request object chứa cookies
   * @param res - Response object để xóa cookie
   * @returns Response thông báo đăng xuất thành công
   * @throws UnauthorizedException nếu token không tồn tại
   */
  @HttpCode(200)
  @Post('logout')
  logout(
    @Req()
    req: {
      cookies: { access_token: string };
    },
    @Res({ passthrough: true }) res: Response,
  ) {
    const cookies = req.cookies as CookieMap;
    const access_token = cookies.access_token;

    if (!access_token) {
      throw new UnauthorizedException({
        message: 'Token không tồn tại trong cookies!',
        success: false,
        timestamp: new Date(),
      });
    }

    res.clearCookie('access_token', authCookieConfig);

    return {
      message: 'Đăng xuất thành công!',
      success: true,
      timestamp: new Date(),
    };
  }
}
