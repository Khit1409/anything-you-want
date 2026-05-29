import { Role } from '@/src/common/enums/roles.enum';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StringValue } from 'ms';

type TokenPayloadType = {
  uid: string;
  role: Role;
  email: string;
};

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async createLoginToken(
    payload: TokenPayloadType,
    expiresIn?: StringValue | number,
  ) {
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: expiresIn ?? '1d',
    });
    return token;
  }
}
