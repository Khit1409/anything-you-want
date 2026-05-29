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

import { CookieMap } from '@/src/interfaces/cookies.interface';
import { authCookieConfig } from '@/src/lib/cookie.config';

import { LoginService } from '../services/login.service';
import { LoginRequestDto } from '../dtos/auth.request.dto';
import { HelperService } from '../../helpers/helper.service';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly authService: AuthService,
    private readonly helperService: HelperService,
  ) {}

  @HttpCode(200)
  @Post('login')
  async login(
    @Body() dto: LoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, role } = await this.loginService.login(dto);
    res.cookie('access_token', token, authCookieConfig);
    return this.helperService.successResponse({
      message: 'Đăng nhập thành công!',
      data: { role },
    });
  }

  @HttpCode(200)
  @Get('me')
  async auth(@Req() req: Request) {
    const result = await this.authService.authentication(req);
    const { email, role, uid } = result;

    return this.helperService.successResponse({
      message: 'Xác thực người dùng thành công!',
      data: {
        email,
        role,
        uid,
      },
    });
  }

  @Get('')
  checkAuthenticationData(req: Request) {
    const logData = req.user;
    return logData ?? 'Không có dữ liệu xác thực!';
  }

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
      throw new UnauthorizedException(
        this.helperService.errorResponse({
          message: 'Token không tồn tại trong cookies!',
        }),
      );
    }

    res.clearCookie('access_token', authCookieConfig);

    return this.helperService.successResponse({
      message: 'Đăng xuất thành công!',
    });
  }
}
