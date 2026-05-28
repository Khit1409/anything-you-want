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

import { Type } from 'class-transformer';

export class CreateProductInfoDto {
  @IsOptional()
  @IsString()
  brand?: string;
  @IsString()
  category: string;
  @IsString()
  description: string;
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  origin?: string;
  @IsNumber()
  price: number;
  @Min(0)
  @Max(100)
  sale: number;
}

export class CreateProductClassificationValueDto {
  @IsOptional()
  @IsString()
  img?: string;
  @IsString()
  name: string;
}

export class CreateProductClassificationDto {
  @IsString()
  name: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductClassificationValueDto)
  values: CreateProductClassificationValueDto[];
}

export class CreateProductImageDto {
  @IsString()
  thumbnail: string;
  @IsArray()
  @IsString({ each: true })
  details: string[];
}

export class CreateProductShippingDto {
  @IsBoolean()
  flash: boolean;
  @IsBoolean()
  normal: boolean;
}

export class CreateProductDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductClassificationDto)
  classifications: CreateProductClassificationDto[];
  @ValidateNested()
  @Type(() => CreateProductImageDto)
  images: CreateProductImageDto;
  @ValidateNested()
  @Type(() => CreateProductInfoDto)
  info: CreateProductInfoDto;
  @ValidateNested()
  @Type(() => CreateProductShippingDto)
  shipping: CreateProductShippingDto;
}
