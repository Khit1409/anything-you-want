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
  @IsOptional()
  @IsString()
  brand?: string | undefined;
  @IsString()
  category: string;
  @IsString()
  description: string;
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  origin?: string | undefined;
  @IsNumber()
  price: number;
  @Min(0)
  @Max(100)
  sale: number;
}

export class UpdateProductClassificationValueDto {
  @IsOptional()
  @IsString()
  img?: string | undefined;
  @IsString()
  name: string;
}

export class UpdateProductClassificationDto {
  @IsString()
  name: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductClassificationValueDto)
  values: UpdateProductClassificationValueDto[];
}

export class UpdateProductShippingDto {
  @IsBoolean()
  flash: boolean;
  @IsBoolean()
  normal: boolean;
}

export class UpdateProductImageDto {
  @IsOptional()
  @IsString()
  thumbnail?: string;
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  details?: string[];
}

export class UpdateProductDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductClassificationDto)
  classifications?: UpdateProductClassificationDto[];
  @IsOptional()
  @Type(() => UpdateProductImageDto)
  images?: UpdateProductImageDto;
  @IsOptional()
  @Type(() => UpdateProductInfoDto)
  info?: UpdateProductInfoDto;
  @IsOptional()
  @Type(() => UpdateProductShippingDto)
  shipping?: UpdateProductShippingDto;
}
