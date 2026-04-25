export type UserPhones = Array<UserPhone>;

export type UserPhone = {
  id: string;
  phoneNumber: string;
};

export type UserAddresses = Array<UserAddress>;
export type UserAddress = {
  id: string;
  province: string;
  ward: string;
  addressDetail: string;
};

export type UserInfo = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar?: string;
  dateOfBirth: string;
};

export interface Profile {
  phones: UserPhones;
  addresses: UserAddresses;
  info: UserInfo;
}
