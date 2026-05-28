import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

/**
 * DTO cho một variant cần cập nhật stock
 * Chứa variant ID hoặc SKU và số lượng stock mới
 */
export class VariantUpdateDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  extraPrice?: number;
}

/**
 * DTO cho request cập nhật multiple variants
 * Nhận mảng các variant cần cập nhật
 */
export class UpdateVariantDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantUpdateDto)
  variants: VariantUpdateDto[];
}
