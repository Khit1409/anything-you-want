import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class CartInfoRequestDto {
  @IsNumber()
  originPrice: number;
  @IsNumber()
  totalPrice: number;
  @IsString()
  productId: string;
  @IsInt()
  quantity: number;
  @IsInt()
  @Min(0)
  @Max(100)
  sale: number;
}

export class CartClassificationValue {
  @IsString()
  name: string;
  @IsBoolean()
  choosen: boolean;
  @IsOptional()
  @IsString()
  img: string;
  @IsNumber()
  extraPrice: number;
  @IsNumber()
  stock: number;
}

export class CartClassification {
  @IsString()
  name: string;
  @ValidateNested()
  @IsArray()
  @Type(() => CartClassificationValue)
  values: CartClassificationValue[];
}
export class CartRequestDto {
  @ValidateNested()
  @Type(() => CartInfoRequestDto)
  info: CartInfoRequestDto;
  @ValidateNested()
  @IsArray()
  @Type(() => CartClassification)
  classification: CartClassification[];
}

export class CartUpdateDataRequestDto {
  @IsString()
  id: string;
  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;
}
