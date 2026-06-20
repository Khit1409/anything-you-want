import { IsNumber, IsString, Min, IsArray } from 'class-validator';

export class CreateCartDto {
  @IsString()
  productId!: string;
  @IsArray()
  @IsString({ each: true })
  optionIds!: string[];
  @IsNumber()
  @Min(1)
  quantity!: number;
}
