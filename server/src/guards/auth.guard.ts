import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    if (!req.userId) {
      throw new UnauthorizedException({
        message: 'Please login!',
        success: false,
        timestamp: new Date().toLocaleDateString('vi-VN'),
      });
    }
    return true;
  }
}
