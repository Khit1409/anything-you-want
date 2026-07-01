import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';

import { LoginService } from '../services/login.service';
import { LoginRequestDto } from '../dtos/auth.request.dto';
import { HelperService } from '@/common/services/helper.service';
import { AuthService } from '../services/auth.service';
import { CreateUserService } from '../../users/services/create.service';
import { CreateSellerService } from '../../sellers/services/create.service';
import { RegisterUserAccountRequestDto } from '../../users/dtos/register.dto';
import { CreateSellerDto } from '../../sellers/dtos';
import { Public } from '@/shared/decorators/public-api-url.decorator';
import { Role } from '@/shared/enums/roles.enum';
import { CookieMap } from '@/types/express';
import { authCookieConfig } from '@/configs/cookie.config';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly authService: AuthService,
    private readonly helperService: HelperService,
    private readonly createUserService: CreateUserService,
    private readonly createSellerService: CreateSellerService,
  ) {}

  @HttpCode(200)
  @Post('register/:role')
  async register(
    @Body() dto: RegisterUserAccountRequestDto | CreateSellerDto,
    @Param('role') role: Role,
  ) {
    if (role === Role.USER) {
      const data = dto as RegisterUserAccountRequestDto;
      const result = await this.createUserService.create(data);

      return this.helperService.responseConfig({
        message: result
          ? 'Đăng ký tài khoản người dùng thành công!'
          : 'Đăng ký tài khoản người dùng thất bại!',
        success: result,
      });
    }
    const data = dto as CreateSellerDto;
    const result = await this.createSellerService.create(data);
    return this.helperService.responseConfig({
      message: result
        ? 'Đăng ký tài khoản bán hàng thành công!'
        : 'Đăng ký tài khoản bán hàng thất bại!',
      success: result,
    });
  }

  @HttpCode(200)
  @Post('login')
  async login(
    @Body() dto: LoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, accessToken, role } =
      await this.loginService.login(dto);
    res.cookie('access_token', accessToken, authCookieConfig);
    res.cookie('refresh_token', refreshToken, authCookieConfig);
    return this.helperService.successResponse({
      message: 'Đăng nhập thành công!',
      data: { role },
    });
  }

  @HttpCode(200)
  @Get('me')
  auth(@Req() req: Request) {
    const { access_token, refresh_token } = req.cookies as CookieMap;
    const data = this.authService.authentication(access_token, refresh_token);
    return this.helperService.successResponse({
      message: 'Xác thực người dùng thành công!',
      data,
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
    req: Request,
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
    res.clearCookie('refresh_token', authCookieConfig);

    return this.helperService.successResponse({
      message: 'Đăng xuất thành công!',
    });
  }
}
