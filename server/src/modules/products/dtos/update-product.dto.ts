import { Type } from 'class-transformer';
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
import {
  ProductPhysical,
  ProductPhysicalDimensions,
} from '../schemas/product-physical.schema';
import {
  ProductShipping,
  ProductShippingMethod,
  ProductShippingMethodTimes,
  ShippingMethod,
} from '../schemas/product-shipping.schema';

export class UpdateProductInfoDto {
  @IsOptional()
  @IsString()
  brand: string | undefined;
  @IsString()
  category: string;
  @IsString()
  description: string;
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  origin: string | undefined;
  @IsNumber()
  price: number;
  @Min(0)
  @Max(100)
  sale: number;
}

export class UpdateProductClassificationValueDto {
  @IsOptional()
  @IsString()
  id: string | undefined;
  @IsOptional()
  @IsString()
  img: string | undefined;
  @IsString()
  name: string;
}

export class UpdateProductClassificationDto {
  @IsOptional()
  @IsString()
  id?: string;
  @IsString()
  name: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductClassificationValueDto)
  values: UpdateProductClassificationValueDto[];
}

export class UpdateProductShippingTime implements ProductShippingMethodTimes {
  @IsNumber()
  deliveryDays: number;
  @IsNumber()
  prepareDays: number;
}

export class UpdateProductShippingMethodDto implements ProductShippingMethod {
  @IsBoolean()
  enabled: boolean;
  @IsArray()
  @IsString({ each: true })
  supportedProvinces: string[];
  @ValidateNested()
  @Type(() => UpdateProductShippingTime)
  times: UpdateProductShippingTime;
  @IsString()
  @IsEnum(ShippingMethod)
  type: ShippingMethod;
}

export class UpdateProductShippingDto implements ProductShipping {
  @ValidateNested()
  @IsArray()
  @Type(() => UpdateProductShippingMethodDto)
  methods: UpdateProductShippingMethodDto[];
}

export class UpdateProductImageDto {
  @IsOptional()
  @IsString()
  thumbnail: string;
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  details: string[];
}

export class UpdateProductDimensions implements ProductPhysicalDimensions {
  @IsNumber()
  height: number;
  @IsNumber()
  width: number;
  @IsNumber()
  length: number;
}

export class UpdateProductPhysical implements ProductPhysical {
  @IsNumber()
  weight: number;
  @Type(() => UpdateProductDimensions)
  @ValidateNested()
  dimensions: UpdateProductDimensions;
}

export class UpdateVariantDto {
  @IsString()
  id: string;
  @IsString()
  sku: string;
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock: number;
  @IsOptional()
  @IsNumber()
  @Min(0)
  extraPrice: number;
  @IsString()
  options: string;
}

export class UpdateProductDto {
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => UpdateProductClassificationDto)
  classifications: UpdateProductClassificationDto[];
  @ValidateNested()
  @Type(() => UpdateProductImageDto)
  images: UpdateProductImageDto;
  @ValidateNested()
  @Type(() => UpdateProductInfoDto)
  info: UpdateProductInfoDto;
  @ValidateNested()
  @Type(() => UpdateProductShippingDto)
  shipping: UpdateProductShippingDto;
  @ValidateNested()
  @Type(() => UpdateProductPhysical)
  physical: UpdateProductPhysical;
}
