import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthenticationData } from '../modules/auth/interfaces/response.interface';
import { HelperService } from '../modules/common/services/helper.service';
import { CookieMap } from '../types/express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly helperService: HelperService,
  ) {}

  use(req: Request, res: Response, next: () => void) {
    const cookies = req.cookies as CookieMap;
    const accessToken = cookies.access_token;
    const refreshToken = cookies.refresh_token;
    if (!accessToken && !refreshToken) {
      return next();
    }

    let decoded: AuthenticationData | undefined;

    if (accessToken) {
      decoded = this.jwtService.verify<AuthenticationData>(accessToken);
    } else if (!accessToken && refreshToken) {
      decoded = this.jwtService.verify<AuthenticationData>(refreshToken);
    }

    if (!decoded) return next();

    try {
      const { uid, email, role } = decoded;
      req.userId = uid;
      req.role = role;
      req.email = email;
      req.user = decoded;
    } catch (error) {
      throw new NotFoundException(
        this.helperService.errorResponse({
          message: error ? (error as string) : 'Unknow exception!',
        }),
      );
    }

    return next();
  }
}
