import { Role } from '@/shared/enums/roles.enum';

export type TokenExpireType = '1d' | '1h' | number;

export interface AuthenticationData {
  email: string;
  uid: string;
  role: Role;
  iat: number;
  exp: number;
}

export interface TokenSecurity {
  accessToken: string;
  refreshToken: string;
}
