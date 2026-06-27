import { FindOptionsWhere, ObjectId } from 'typeorm';
import { Seller, SellerStatus } from '../../entities/seller.entity';
import {
  CreateSellerAddressDto,
  CreateSellerInfoDto,
  CreateSellerPhoneDto,
} from '../../dtos';
import { CreateStoreDto } from '@/src/modules/stores/dtos/create-store.dto';

export type FilterUpdatetype =
  | string
  | string[]
  | number
  | number[]
  | Date
  | Date[]
  | ObjectId
  | ObjectId[]
  | FindOptionsWhere<Seller>
  | FindOptionsWhere<Seller>[];

export type CreateSellerType = {
  addresses: CreateSellerAddressDto[];
  status: SellerStatus;
  emailAddress: string;
  hashPassword: string;
  info: CreateSellerInfoDto;
  phones: CreateSellerPhoneDto[];
  store: CreateStoreDto;
};
