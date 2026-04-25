import { Expose } from 'class-transformer';

export class UserInfoResponseDto {
  @Expose()
  firstName: string;
  @Expose()
  lastName: string;
  @Expose()
  fullName: string;
  @Expose()
  avatar?: string;
  @Expose()
  dateOfBirth: string;
}
