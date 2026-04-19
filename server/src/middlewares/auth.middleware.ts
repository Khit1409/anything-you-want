import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthenticationDataDto } from '../modules/auth/dto/auth.response.dto';
import { CookieMap } from '../interfaces/cookies.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: () => void) {
    const cookies = req.cookies as CookieMap;
    const accessToken = cookies.access_token;

    if (!accessToken) {
      res.status(401).json({
        message:
          'Token is not found, can is user not yet login or ran out of expire token!',
        success: false,
        timestamp: new Date().toLocaleDateString('vi-VN'),
      });
      return next();
    }

    const decoded: AuthenticationDataDto = this.jwtService.verify(accessToken);

    if (!decoded) {
      res.status(401).json({
        message: 'Verify token is fail, please check decoded method!',
        success: false,
        timestamp: new Date().toLocaleDateString('vi-VN'),
      });
      return next();
    }

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

    return next();
  }
}
