import { AuthenticatedGuard } from '@/guards/authenticated.guard';
import { Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

export const AUHT_GUARD_PROVIDER: Provider = {
  provide: APP_GUARD,
  useClass: AuthenticatedGuard,
};
