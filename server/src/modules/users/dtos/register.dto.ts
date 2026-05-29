import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

export class RegisterUserAccountAddress {
  @IsString()
  province!: string;
  @IsString()
  ward!: string;
  @IsString()
  addressDetail!: string;
}

export class RegisterUserAccountPhone {
  @IsString()
  @Length(10)
  phoneNumber!: string;
}

export class RegisterUserAccountRequestDto {
  @IsString()
  @IsNotEmpty()
  emailAddress!: string;
  @IsString()
  @IsNotEmpty()
  currentPassword!: string;
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
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RegisterUserAccountAddress)
  address!: Array<RegisterUserAccountAddress>;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RegisterUserAccountPhone)
  phones!: Array<RegisterUserAccountPhone>;
}
