import { Type } from 'class-transformer';
import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  IsNumber,
  IsArray,
  IsBoolean,
  ValidateNested,
} from 'class-validator';

export class GetProductQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;
}

export class CreateProductImageDto {
  @IsString()
  thumbnail!: string;
  @IsArray()
  @Type(() => String)
  details!: string[];
}

export class CreateProductClassificationValueDto {
  @IsString()
  name!: string;
  @IsNumber()
  stock!: number;
  @IsNumber()
  extraPrice!: number;
  @IsOptional()
  @IsString()
  img?: string;
}
export class CreateProductClassificationDto {
  @IsString()
  name!: string;
  @IsArray()
  @Type(() => CreateProductClassificationValueDto)
  values!: CreateProductClassificationValueDto[];
}

export class CreateProductInfoDto {
  @IsString()
  name!: string;
  @IsString()
  description!: string;
  @IsNumber()
  price!: number;
  @IsNumber()
  @Max(100)
  @Min(0)
  sale!: number;
  @IsOptional()
  @IsString()
  brand?: string;
  @IsOptional()
  @IsString()
  origin?: string;
  @IsString()
  category!: string;
}

export class CreateProductShipping {
  @IsBoolean()
  normal!: boolean;
  @IsBoolean()
  flash!: boolean;
}
export class CreateProductDto {
  @ValidateNested()
  @Type(() => CreateProductInfoDto)
  info!: CreateProductInfoDto;
  @IsArray()
  @Type(() => CreateProductClassificationDto)
  classification!: CreateProductClassificationDto[];
  @IsArray()
  @Type(() => String)
  tags!: string[];
  @ValidateNested()
  @Type(() => CreateProductImageDto)
  images!: CreateProductImageDto;
  @ValidateNested()
  @Type(() => CreateProductShipping)
  shipping!: CreateProductShipping;
}
