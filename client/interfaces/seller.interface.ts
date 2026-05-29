import { ProductPreviews } from "./product.interface";
import { CreateStoreRequest } from "./store.interface";

export type SellerProductPreviews = ProductPreviews;

export enum SellerPhoneType {
  COMPANY = "company",
  INDIVIDUAL = "individual",
}

export interface RegisterSellerInfo {
  firstName: string;
  lastName: string;
  fullName: string;
  avatar?: string;
  dateOfBirth: string;
}

export type RegisterSellerAddress = {
  province: string;
  ward: string;
  addressDetail: string;
};

export type RegisterSellerAddresses = Array<RegisterSellerAddress>;

export type RegisterSellerPhone = {
  phoneNumber: string; //max 10
  type: SellerPhoneType;
};

export type RegisterSellerPhones = Array<RegisterSellerPhone>;

export type RegisterSellerAuth = {
  currentPassword:string;
  emailAddress:string;
  rePassword:string;
}

export interface RegisterSellerAccount {
  emailAddress: string;
  currentPassword: string;
  info: RegisterSellerInfo;
  addresses: RegisterSellerAddresses;
  phones: RegisterSellerPhones;
  store: CreateStoreRequest;
}
