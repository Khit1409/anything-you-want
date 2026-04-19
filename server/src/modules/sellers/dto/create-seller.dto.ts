import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { SellerPhoneType } from '../entities/seller-phone.entity';
import { Type } from 'class-transformer';
import { CreateStoreDto } from '../../stores/dto/create-store.dto';

export class CreateSeller {}
/**
 *
 */
export class CreateSellerInfoDto {
  @IsString()
  firstName!: string;
  @IsString()
  lastName!: string;
  @IsString()
  fullName!: string;
  @IsOptional()
  @IsString()
  avatar?: string;
  @IsString()
  dateOfBirth!: string;
}
/**
 *
 */
export class CreateSellerAddressDto {
  @IsString()
  province!: string;
  @IsString()
  ward!: string;
  @IsString()
  addressDetail!: string;
}
/**
 *
 */
export class CreateSellerPhoneDto {
  @IsString()
  @Length(10)
  phoneNumber!: string;
  @IsEnum(SellerPhoneType)
  type!: SellerPhoneType;
}
/**
 * all register dto
 */
export class CreateSellerDto {
  @IsEmail()
  emailAddress!: string;
  @IsString()
  @MaxLength(255)
  @MinLength(6)
  currentPassword!: string;
  @ValidateNested()
  @Type(() => CreateSellerInfoDto)
  info!: CreateSellerInfoDto;
  @ValidateNested()
  @IsArray()
  @Type(() => CreateSellerAddressDto)
  addresses!: CreateSellerAddressDto[];
  @ValidateNested()
  @IsArray()
  @Type(() => CreateSellerPhoneDto)
  phones!: CreateSellerPhoneDto[];
  @ValidateNested()
  @Type(() => CreateStoreDto)
  store!: CreateStoreDto;
}
