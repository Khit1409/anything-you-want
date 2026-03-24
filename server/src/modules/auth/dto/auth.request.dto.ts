import { Type } from 'class-transformer';
import {
  IsString,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsEnum,
  Length,
  IsDateString,
} from 'class-validator';
import { RoleDto } from '../../common/dto/response.common.dto';

class RegisterUserAccountAddress {
  @IsString()
  province: string;
  @IsString()
  ward: string;
  @IsString()
  addressDetail: string;
}

class RegisterUserAccountPhone {
  @IsString()
  @Length(10)
  phoneNumber: string;
}

export class RegisterUserAccountRequestDto {
  @IsString()
  @IsNotEmpty()
  emailAddress: string;
  @IsString()
  @IsNotEmpty()
  currentPassword: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsString()
  @IsNotEmpty()
  fullName: string;
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RegisterUserAccountAddress)
  address: Array<RegisterUserAccountAddress>;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RegisterUserAccountPhone)
  phones: Array<RegisterUserAccountPhone>;
}

export class LoginRequestDto {
  @IsString()
  @IsNotEmpty()
  emailAddress: string;
  @IsString()
  @IsNotEmpty()
  currentPassword: string;
  @IsEnum(RoleDto)
  @IsNotEmpty()
  loginRole: RoleDto;
}
