import { Expose } from 'class-transformer';

export class VariantReponseDto {
  @Expose()
  id: string;
  @Expose()
  sku: string;
  @Expose()
  extraPrice: number;
  @Expose()
  stock: number;
  @Expose()
  options: Record<string, string>;
}
