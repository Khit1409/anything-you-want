/**
 * Request of register user basic information
 */
export interface RegisterUserInfoRequest {
  emailAddress: string;
  currentPassword: string;
  lastName: string;
  fullName: string;
  firstName: string;
  dateOfBirth: string;
}

export interface RegisterUserAddressRequest {
  province: string;
  ward: string;
  addressDetail: string;
}

export interface RegisterUserPhoneRequest {
  phoneNumber: string;
}

export interface RegisterUserAccountRequest extends RegisterUserInfoRequest {
  address: Array<RegisterUserAddressRequest>;
  phones: Array<RegisterUserPhoneRequest>;
}

export type UserPhones = Array<UserPhone>;

export type UserPhone = {
  id: string;
  phoneNumber: string;
};

/**
 * Users address list
 */
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
