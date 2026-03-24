import { IsNumber, IsString } from 'class-validator';

export class ResponseDto {
  @IsString()
  message: string;
  @IsNumber()
  success: boolean;
  @IsString()
  timestamp: Date | string;
}

export class TimestampResponseDto {
  @IsString()
  createdAt: string;
  @IsString()
  updatedAt: string;
}

export enum RoleDto {
  USER = 'user',
  SELLER = 'seller',
}
