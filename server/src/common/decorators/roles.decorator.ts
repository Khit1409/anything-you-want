import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/roles.enum';

/**
 * Metadata key dùng để lưu thông tin role cho guard.
 */
export const ROLES_KEY = 'roles';

/**
 * Decorator `@Roles(...)` dùng để đánh dấu route/controller yêu cầu một hoặc nhiều Role.
 * Nó đặt metadata `roles` để sau này guard có thể kiểm tra quyền truy cập.
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
