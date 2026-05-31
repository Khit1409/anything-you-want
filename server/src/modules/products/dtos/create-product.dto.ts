import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';
import { ShippingMethod } from '../schemas/product-shipping.schema';

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

export class CreateProductShippingMethodTimeDto {
  @IsNumber()
  @Min(0)
  prepareDays: number;
  @IsNumber()
  @Min(0)
  deliveryDays: number;
}

export class CreateProductShippingMethodDto {
  @IsEnum(ShippingMethod)
  type: ShippingMethod;
  @IsBoolean()
  enabled: boolean;
  @ValidateNested()
  @Type(() => CreateProductShippingMethodTimeDto)
  times: CreateProductShippingMethodTimeDto;
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  supportedProvinces: string[];
}

export class CreateProductDimensionDto {
  @IsNumber()
  width: number;
  @IsNumber()
  height: number;
  @IsNumber()
  length: number;
}
export class CreateProductPhysicalDto {
  @IsNumber()
  weight: number;
  @ValidateNested()
  @Type(() => CreateProductDimensionDto)
  dimensions: CreateProductDimensionDto;
}

export class CreateProductShippingDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductShippingMethodDto)
  methods: CreateProductShippingMethodDto[];
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
  shipping: CreateProductShippingDto; // mặc định bên client sẽ sinh ra 1 object cho standard
  @ValidateNested()
  @Type(() => CreateProductPhysicalDto)
  physical: CreateProductPhysicalDto;
}
