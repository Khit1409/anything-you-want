import { IsNumber, IsString, Min } from 'class-validator';

export class CreateCartDto {
  @IsString()
  productId!: string;
  @IsString()
  sku!: string;
  @IsNumber()
  @Min(1)
  quantity!: number;
}
