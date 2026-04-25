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

export class UpdateProductInfoDto {
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  category?: string;
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

export class UpdateProductClassificationValueDto {
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
export class UpdateProductClassificationDto {
  @IsString()
  name: string;
  @ValidateNested()
  @Type(() => UpdateProductClassificationValueDto)
  values: Array<UpdateProductClassificationValueDto>;
}
export class UpdateProductShippingDto {
  @IsBoolean()
  flash: boolean;
  @IsBoolean()
  normal: boolean;
}
export class UpdateProductImageDto {
  @IsString()
  thumbnail: string;
  @IsArray()
  @IsString({ each: true })
  details: string[];
}
export class UpdateProductDto {
  @IsOptional()
  @Type(() => UpdateProductInfoDto)
  info?: UpdateProductInfoDto;
  @IsOptional()
  @Type(() => UpdateProductClassificationDto)
  classification?: Array<UpdateProductClassificationDto>;
  @IsOptional()
  @Type(() => UpdateProductShippingDto)
  shipping?: UpdateProductShippingDto;
  @IsOptional()
  @Type(() => UpdateProductImageDto)
  images?: UpdateProductImageDto;
}
