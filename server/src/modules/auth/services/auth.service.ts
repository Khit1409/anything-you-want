import { Injectable } from '@nestjs/common';
import { TokenService } from '../../common/services/token.service';

@Injectable()
export class AuthService {
  constructor(private readonly tokenService: TokenService) {}

  authentication(accessToken?: string, refreshToken?: string) {
    return this.tokenService.decodeToken(refreshToken, accessToken);
  }
}
