export interface CreateUserSecurity {
  currentPassword: string;
  emailAddress: string;
}

export interface CreateUserInfo {
  lastName: string;
  firstName: string;
  fullName: string;
  avatar: string | null;
  dateOfBirth: string;
}

export interface CreateUserPhone {
  phoneNumber: string;
}

export interface CreateUserAddress {
  ward: string;
  province: string;
  addressDetail: string;
}
