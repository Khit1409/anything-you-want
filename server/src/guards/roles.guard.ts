import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { ROLES_KEY } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
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

    if (role !== requiredRoles) {
      throw new ForbiddenException({
        success: false,
        message: 'Process just for seller!',
        timestamp: new Date().toDateString(),
      });
    }
    return true;
  }
}
