import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../common/enums/roles.enum';
import { ROLES_KEY } from '../common/decorators/roles.decorator';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();
    const { role } = request;
    if (!role) {
      throw new UnauthorizedException({
        success: false,
        message: 'Please login!',
        timestamp: new Date().toDateString(),
      });
    }
    if (!requiredRoles.includes(role)) {
      throw new ForbiddenException({
        success: false,
        message: 'Process just for seller!',
        timestamp: new Date().toDateString(),
      });
    }
    return requiredRoles.includes(role);
  }
}
