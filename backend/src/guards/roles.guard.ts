import { Role } from './../roles/roles.model';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtSerivce: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (!requiredRoles) return true;

      const req = context.switchToHttp().getRequest();
      const header = req.headers.authorization;
      const bearer = header.split(' ')[0];
      const token = header.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        return false;
      }

      const user = this.jwtSerivce.verify(token);
      req.user = user;

      return user.roles.some((role: Role) =>
        requiredRoles.includes(role.value),
      );
    } catch (error) {
      console.log(error);
      throw new ForbiddenException({
        message: 'У вас нет доступа к этой странице',
      });
    }
  }
}
