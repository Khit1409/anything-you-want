import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { CookieMap } from '@/src/interfaces/cookies.interface';

import { AuthenticationDataDto } from '../dtos/auth.response.dto';
import { HelperService } from '../../helpers/helper.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly helperSerive: HelperService,
  ) {}

  async authentication(req: Request) {
    const cookies = req.cookies as CookieMap;
    const accessToken = cookies.access_token;

    if (!accessToken) {
      throw new UnauthorizedException(
        this.helperSerive.errorResponse({
          message:
            'Token không tìm thấy, vui lòng đăng nhập hoặc token đã hết hạn!',
        }),
      );
    }

    const decoded: AuthenticationDataDto =
      await this.jwtService.verifyAsync(accessToken);

    if (!decoded) {
      throw new NotFoundException(
        this.helperSerive.errorResponse({
          message: 'Không thể xác mình token!',
        }),
      );
    }

    const data = { ...decoded };
    return data;
  }
}
