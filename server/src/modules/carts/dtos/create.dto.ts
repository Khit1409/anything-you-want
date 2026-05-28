import { IsNumber, IsString, Min } from 'class-validator';

export class CreateCartDto {
  @IsString()
  productId!: string;
  @IsString()
  variant!: string;
  @IsNumber()
  @Min(1)
  quantity!: number;
}
