import { UserStatus } from '../entities/user.entity';

export type OwnerSectionSave = { id: string };
export interface CreateUserInfoSave {
  firstName: string;
  lastName: string;
  fullName: string;
  user: OwnerSectionSave;
  dateOfBirth: Date;
  avatar: string | null;
}
export interface CreateUserSave {
  hashPassword: string;
  emailAddress: string;
  status: UserStatus;
}
export type CreateUserPhoneSaves = {
  phoneNumber: string;
  user: OwnerSectionSave;
}[];

export type CreateUserAddressSaves = {
  province: string;
  ward: string;
  addressDetail: string;
  user: OwnerSectionSave;
}[];
