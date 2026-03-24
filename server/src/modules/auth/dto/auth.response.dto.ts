import { IsEnum, IsOptional, IsString } from 'class-validator';

import { Type } from 'class-transformer';
import { ResponseDto } from 'src/modules/common/dto/response.common.dto';
import { Role } from '@/src/common/enums/role.enum';

export type TokenExpire = '1d' | '1h' | number;

export class LoginResponseDto extends ResponseDto {
  @IsOptional()
  @Type(() => LoginDataResponseDto)
  data?: LoginDataResponseDto;
  @IsString()
  token: string;
}
export class LoginDataResponseDto {
  @IsEnum(Role)
  role: Role;
}
export class CookieValueLoginResponse {
  @IsString()
  token: string;
  @IsString()
  tokenName: string;
}

export class AuthenticationResponseDto extends ResponseDto {
  @IsOptional()
  @Type(() => AuthenticationDataDto)
  data?: AuthenticationDataDto;
}

export class AuthenticationDataDto {
  @IsString()
  email: string;
  @IsString()
  uid: string;
  @IsEnum(Role)
  role: Role;
}
export class ProfileDataResponseDto {
  @IsString()
  id: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  fullName: string;
  @IsString()
  dateOfBirth: Date | string;
  @IsOptional()
  avatar?: string;
}
/**
 * response to client
 */
export class ProfileResponseDto extends ResponseDto {
  @IsOptional()
  @Type(() => ProfileDataResponseDto)
  data?: ProfileDataResponseDto;
}
export class RegisterUserAccountResponseDto extends ResponseDto {
  readonly;
}
