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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async login(
    @Body() dto: LoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (dto.loginRole === RoleDto.SELLER) {
      const result = await this.authService.sellerLogin(dto);
      const { token, data, message, success, timestamp } = result;
      res.cookie('access_token', token, authCookieConfig);
      return { message, success, timestamp, data };
    }
    const result = await this.authService.clientLogin(dto);
    const { token, data, message, success, timestamp } = result;
    res.cookie('access_token', token, authCookieConfig);
    return { message, success, timestamp, data };
  }
  /**
   * @param role
   * @param req
   * @param res
   * @returns
   */
  @HttpCode(200)
  @Get('me')
  async auth(@Req() req: Request) {
    //handle
    const result = await this.authService.clientAuth(req);
    const { message, success, data, timestamp } = result;

    return { message, success, timestamp, data };
  }
  /**
   * @param role
   * @param Res
   * @param req
   * @returns
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
        message: 'Not existing your token in cookies!',
        success: false,
        timestamp: new Date(),
      });
    }

    res.clearCookie('access_token', authCookieConfig);

    return {
      message: 'Logout is successfully!',
      success: true,
      timestamp: new Date(),
    };
  }
  @Get('')
  checkAuthenticationData(req: Request) {
    const logData = req.user;

    return logData ?? 'No data existing!';
  }
}
