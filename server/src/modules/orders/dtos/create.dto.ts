import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ShippingMethod } from '../../products/schemas/product-shipping.schema';
import { PaymentType } from '../entities/order-payment.entity';
import { Type } from 'class-transformer';

export class CreateOrderAddressDto {
  @IsString()
  province: string;
  @IsString()
  ward: string;
  @IsString()
  detail: string;
  @IsString()
  provinceCode: string;
}

export class CreateOrderContactDto {
  @IsString()
  phone: string;
  @IsEmail()
  email: string;
  @IsString()
  userName: string;
}

export class CreateOrderDto {
  @IsString()
  productId: string;
  @IsNumber()
  @Min(1)
  quantity: number;
  @IsString()
  variantId: string;
  @IsString()
  @IsEnum(ShippingMethod)
  shipMethod: ShippingMethod;
  @IsString()
  @IsEnum(PaymentType)
  paymentType: PaymentType;
  @IsOptional()
  @IsString()
  bankingId?: string;
  @ValidateNested()
  @Type(() => CreateOrderAddressDto)
  address: CreateOrderAddressDto;
  @ValidateNested()
  @Type(() => CreateOrderContactDto)
  contact: CreateOrderContactDto;
}
