import { RolesGuard } from '@/guards/roles.guard';
import { Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

export const PERMISSION_PROVIDER: Provider = {
  provide: APP_GUARD,
  useClass: RolesGuard,
};
