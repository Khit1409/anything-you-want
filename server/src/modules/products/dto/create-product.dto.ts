import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateProductInfoDto {
  @IsString()
  name: string;
  @IsString()
  category: string;
  @IsNumber()
  price: number;
  @IsString()
  description: string;
  @IsNumber()
  @Min(0)
  @Max(100)
  sale: number;
  @IsOptional()
  @IsString()
  origin?: string;
  @IsOptional()
  @IsString()
  brand?: string;
}
export class CreateProductClassificationValueDto {
  @IsString()
  name: string;
  @IsNumber()
  @Min(1)
  stock: number;
  @IsNumber()
  extraPrice: number;
  @IsOptional()
  @IsString()
  img?: string;
}
export class CreateProductClassificationDto {
  @IsString()
  name: string;
  @ValidateNested()
  @Type(() => CreateProductClassificationValueDto)
  values: Array<CreateProductClassificationValueDto>;
}
export class CreateProductShippingDto {
  @IsBoolean()
  flash: boolean;
  @IsBoolean()
  normal: boolean;
}
export class CreateProductImageDto {
  @IsString()
  thumbnail: string;
  @IsArray()
  @IsString({ each: true })
  details: string[];
}
export class CreateProductDto {
  @ValidateNested()
  @Type(() => CreateProductInfoDto)
  info: CreateProductInfoDto;
  @ValidateNested()
  @Type(() => CreateProductClassificationDto)
  classification: Array<CreateProductClassificationDto>;
  @ValidateNested()
  @Type(() => CreateProductShippingDto)
  shipping: CreateProductShippingDto;
  @ValidateNested()
  @Type(() => CreateProductImageDto)
  images: CreateProductImageDto;
}
