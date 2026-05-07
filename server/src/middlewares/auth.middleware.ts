import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthenticationDataDto } from '../modules/auth/dto/auth.response.dto';
import { CookieMap } from '../interfaces/cookies.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  /**
   * Gắn thông tin bảo mật khi đăng nhập của người dùng vào request
   * @param req
   * @param res
   * @param next
   * @returns
   */
  use(req: Request, res: Response, next: () => void) {
    const cookies = req.cookies as CookieMap;
    const accessToken = cookies.access_token;

    if (!accessToken) {
      return next();
    }

    try {
      const decoded: AuthenticationDataDto =
        this.jwtService.verify(accessToken);

      const { uid, email, role } = decoded;
      /**
       * assign user data encode to request
       */
      req.userId = uid;
      req.role = role;
      req.email = email;
      req.user = {
        userId: uid,
        role,
        email,
      };
      console.log(req.user);
    } catch (error) {
      console.log('Auth middleware error: ', error);
    }

    return next();
  }
}
