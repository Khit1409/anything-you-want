import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, Max } from 'class-validator';

/**
 * DTO để lấy danh sách sản phẩm
 * Hỗ trợ phân trang với limit và page
 */
export class GetProductQueryDto {
  /**
   * Số trang (bắt đầu từ 1)
   * @type {number}
   * @optional
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  /**
   * Số sản phẩm trên mỗi trang (1-100)
   * @type {number}
   * @optional
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;
}
