import 'express';
import { Role } from '../common/enums/roles.enum';
import { CookieMap } from '../interfaces/cookies.interface';
import { AuthenticationData } from '../modules/auth/interfaces/response.interface';

export interface CookieMap {
  access_token?: string;
  refresh_token?: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    userId: string;
    role: Role;
    email: string;
    user: AuthenticationData;
    cookies: CookieMap;
  }
}
