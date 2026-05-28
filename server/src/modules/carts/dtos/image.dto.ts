import { Expose, Type } from 'class-transformer';

export class ImageResponseDto {
  @Expose()
  thumbnail!: string;
  @Expose()
  @Type(() => String)
  details!: string[];
}
