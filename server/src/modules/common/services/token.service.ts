import { Role } from '@/shared/enums/roles.enum';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationData } from '../../auth/interfaces/response.interface';
import { HelperService } from './helper.service';

type TokenPayloadType = {
  uid: string;
  role: Role;
  email: string;
};

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly helperService: HelperService,
  ) {}

  async createLoginToken(payload: TokenPayloadType) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: '1d' }),
      this.jwtService.signAsync(payload, { expiresIn: '2d' }),
    ]);
    return { accessToken, refreshToken };
  }

  decodeToken(refreshToken?: string, accessToken?: string) {
    if (!refreshToken && !accessToken)
      throw new UnauthorizedException(
        this.helperService.errorResponse({ message: 'Please login!' }),
      );
    let decoded: AuthenticationData | undefined;
    if (accessToken) {
      decoded = this.jwtService.verify<AuthenticationData>(accessToken);
    } else if (!accessToken && refreshToken) {
      decoded = this.jwtService.verify<AuthenticationData>(refreshToken);
    }
    if (!decoded) {
      throw new UnauthorizedException(
        this.helperService.errorResponse({
          message:
            'Không thể xác minh người dùng hoặc phiên đăng nhập đã hết hạn!',
        }),
      );
    }
    return decoded;
  }
}
