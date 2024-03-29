import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role } from '../../modules/users/schema/users.schema';
import { UsersService } from '../../modules/users/users.service';
import { ROLES_KEY } from '../decators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('Running RolesGuard');

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      // Access allowed since no required roles have been specified in the controller
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const role = (await this.usersService.findOne(user?.username))?.role;

    if (!requiredRoles.includes(role)) {
      console.log('loi');
      throw new UnauthorizedException();
    }
    return true;
  }
}
