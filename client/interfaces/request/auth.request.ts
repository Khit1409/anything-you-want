export interface RegisterUserAccountRequest {
  emailAddress: string;
  currentPassword: string;
  lastName: string;
  fullName: string;
  firstName: string;
  dateOfBirth: Date | string;
  address: Array<{ province: string; ward: string; addressDetail: string }>;
  phones: Array<{ phoneNumber: string }>;
}
