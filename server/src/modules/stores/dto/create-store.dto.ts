import { Type } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

export class CreateStoreInfoDto {
  @IsString()
  name!: string;
  @IsOptional()
  @IsString()
  avatar?: string;
  @IsOptional()
  @IsString()
  thumbnail?: string;
  @IsString()
  description!: string;
  @IsString()
  @Length(10)
  phoneNumber!: string;
  @IsEmail()
  emailAddress!: string;
}

export class CreateStoreDto {
  @IsString()
  @Length(6)
  storeCode!: string;
  @ValidateNested()
  @Type(() => CreateStoreInfoDto)
  info!: CreateStoreInfoDto;
}
