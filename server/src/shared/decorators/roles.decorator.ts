import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/roles.enum';

export const ROLES_KEY = 'role';

export const IsUser = () => SetMetadata(ROLES_KEY, Role.USER);
export const IsSeller = () => SetMetadata(ROLES_KEY, Role.SELLER);
