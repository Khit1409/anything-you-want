import 'express';
import { Role } from '../common/enums/roles.enum';
import { CookieMap } from '../interfaces/cookies.interface';

declare module 'express-serve-static-core' {
  interface Request {
    userId: string;
    role: Role;
    email: string;
    user: { userId: string; role: Role; email: string };
    cookies: CookieMap;
  }
}
