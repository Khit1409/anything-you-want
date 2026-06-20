/* -------------------------------------------------------------------------- */
/*                                   REQUEST                                  */
/* -------------------------------------------------------------------------- */

/**
 * Thông tin cơ bản dùng để đăng ký tài khoản.
 */
export interface RegisterUserInfoRequest {
  emailAddress: string;

  currentPassword: string;

  firstName: string;

  lastName: string;

  fullName: string;

  dateOfBirth: string;
}

/**
 * Địa chỉ người dùng khi đăng ký.
 */
export interface RegisterUserAddressRequest {
  province: string;

  ward: string;

  addressDetail: string;
}

/**
 * Số điện thoại người dùng khi đăng ký.
 */
export interface RegisterUserPhoneRequest {
  phoneNumber: string;
}

/**
 * Request đầy đủ dùng để tạo tài khoản mới.
 */
export interface RegisterUserAccountRequest extends RegisterUserInfoRequest {
  address: RegisterUserAddressRequest[];
  phones: RegisterUserPhoneRequest[];
}

/* -------------------------------------------------------------------------- */
/*                                 USER PHONE                                 */
/* -------------------------------------------------------------------------- */

/**
 * Thông tin số điện thoại người dùng.
 */
export interface UserPhone {
  id: string;

  phoneNumber: string;
}

/**
 * Danh sách số điện thoại.
 */
export type UserPhones = UserPhone[];

/* -------------------------------------------------------------------------- */
/*                                USER ADDRESS                                */
/* -------------------------------------------------------------------------- */

/**
 * Thông tin địa chỉ người dùng.
 */
export interface UserAddress {
  id: string;

  province: string;

  ward: string;

  addressDetail: string;
}

/**
 * Danh sách địa chỉ người dùng.
 */
export type UserAddresses = UserAddress[];

/* -------------------------------------------------------------------------- */
/*                                  USER INFO                                 */
/* -------------------------------------------------------------------------- */

/**
 * Thông tin cơ bản của người dùng.
 */
export interface UserInfo {
  id: string;

  firstName: string;

  lastName: string;

  fullName: string;

  dateOfBirth: string;

  avatar?: string;
}

/* -------------------------------------------------------------------------- */
/*                                   PROFILE                                  */
/* -------------------------------------------------------------------------- */

/**
 * Hồ sơ người dùng.
 */
export interface Profile {
  info: UserInfo;

  phones: UserPhones;

  addresses: UserAddresses;
}
