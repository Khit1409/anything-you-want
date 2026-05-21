import { IsNumber, IsString, Min, IsOptional } from 'class-validator';

export class CartRequestDto {
  @IsString()
  productId!: string;
  @IsString()
  variant!: string;
  @IsNumber()
  @Min(1)
  quantity!: number;
}

export class CartUpdateRequestDto {
  @IsOptional()
  @IsNumber()
  quantity?: number;
  @IsOptional()
  @IsString()
  variant?: string;
}
