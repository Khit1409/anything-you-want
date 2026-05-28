import { ResponseDto } from '@/src/modules/common/dto/response.common.dto';
import { Expose, Type } from 'class-transformer';

import { ImageResponseDto } from './image.dto';
import { InfoResponseDto } from './info.dto';
import { VariantReponseDto } from './variant.dto';
import { ShippingResponseDto } from './shipping.dto';
import { OwnerResponseDto } from './owner.dto';

export class CartApiResponseDto extends ResponseDto {
  status!: number;
  data!: CartApiDataResponseDto;
}

export class CartApiDataResponseDto {
  carts!: Array<CartResponseDto>;
}

export class CartResponseDto {
  @Expose({ name: '_id' })
  id!: string;
  @Expose()
  @Type(() => InfoResponseDto)
  info!: InfoResponseDto;
  @Expose()
  @Type(() => VariantReponseDto)
  variant!: VariantReponseDto;
  @Expose()
  @Type(() => VariantReponseDto)
  otherVariants!: VariantReponseDto[];
  @Expose()
  @Type(() => ShippingResponseDto)
  shipping!: ShippingResponseDto;
  @Expose()
  @Type(() => ImageResponseDto)
  images: ImageResponseDto;
  @Expose()
  @Type(() => OwnerResponseDto)
  owner: OwnerResponseDto;
  @Expose()
  createdAt!: string;
  @Expose()
  updatedAt!: string;
}
