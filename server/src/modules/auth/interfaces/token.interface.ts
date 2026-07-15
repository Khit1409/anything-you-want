import { Role } from '@/shared/enums/roles.enum';

export type TokenPayloadType = {
  uid: string;
  role: Role;
  email: string;
};
