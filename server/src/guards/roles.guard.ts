import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '@/shared/decorators/roles.decorator';
import { Role } from '@/shared/enums/roles.enum';
import type { Request } from 'express';

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
    const req: Request = context.switchToHttp().getRequest();
    const role = req.role as Role;
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
