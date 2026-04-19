import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, Min, IsOptional } from 'class-validator';

export class CartClassificationValueRequestDto {
  @IsString()
  name!: string;
  @IsNumber()
  extraPrice!: number;
  @IsNumber()
  stock!: number;
  @IsOptional()
  img?: string;
}
export class CartClassificationRequestDto {
  @IsString()
  name!: string;
  @Type(() => CartClassificationValueRequestDto)
  values!: CartClassificationValueRequestDto;
}

export class CartRequestDto {
  @IsString()
  productId!: string;
  @Type(() => CartClassificationRequestDto)
  @IsArray()
  classification!: Array<CartClassificationRequestDto>;
  @IsNumber()
  @Min(1)
  quantity!: number;
}
