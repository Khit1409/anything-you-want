import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';

export class CreateUserAddressDto {
  @IsString()
  province!: string;
  @IsString()
  ward!: string;
  @IsString()
  addressDetail!: string;
}

export class CreateUserPhoneDto {
  @IsString()
  @Length(10)
  phoneNumber!: string;
}

export class CreateUserDto {
  @IsEmail()
  emailAddress: string;
  @IsString()
  currentPassword: string;
}

export class CreateUserInfoDto {
  @IsString()
  @IsNotEmpty()
  lastName!: string;
  @IsString()
  @IsNotEmpty()
  fullName!: string;
  @IsString()
  @IsNotEmpty()
  firstName!: string;
  @IsDateString()
  @IsNotEmpty()
  dateOfBirth!: string;
  @ValidateIf((_, value) => value !== null)
  @IsString()
  avatar: string | null = null;
}
