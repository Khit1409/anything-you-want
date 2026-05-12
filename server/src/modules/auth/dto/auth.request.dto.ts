import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { RoleDto } from '../../common/dto/response.common.dto';

export class LoginRequestDto {
  @IsString()
  @IsNotEmpty()
  emailAddress!: string;
  @IsString()
  @IsNotEmpty()
  currentPassword!: string;
  @IsEnum(RoleDto)
  @IsNotEmpty()
  loginRole!: RoleDto;
}
