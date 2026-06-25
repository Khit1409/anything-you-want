import { ProductVariant, ShippingMethod } from "./read.interface";

export interface CreateProductInfo {
  name: string;
  category: string;
  price: number;
  sale: number;
  description: string;
  brand?: string;
  origin?: string;
}

export interface CreateProductClassificationValue {
  name: string;
  img?: string;
}

export type CreateProductClassificationValues =
  CreateProductClassificationValue[];

export interface CreateProductClassification {
  name: string;
  values: CreateProductClassificationValues;
}

export type CreateProductClassifications = CreateProductClassification[];

export type CreateProductShippingTime = {
  deliveryDays: number;
  prepareDays: number;
};

export interface CreateProductShippingMethod {
  type: ShippingMethod;
  enabled: boolean;
  supportedProvinces: string[];
  times: CreateProductShippingTime;
}
export type CreateProductVariants = Omit<ProductVariant, "_id">[];

export type CreateProductShippingMethods = Array<CreateProductShippingMethod>;

export interface CreateProductShipping {
  methods: CreateProductShippingMethods;
}

export interface CreateProductImage {
  thumbnail: string;
  details: string[];
}

export type CreateProductDimensions = {
  height: number;
  width: number;
  length: number;
};

export interface CreateProductPhysical {
  weight: number;
  dimensions: CreateProductDimensions;
}

export interface CreateProductRequest {
  info: CreateProductInfo;
  classifications: CreateProductClassifications;
  shipping: CreateProductShipping;
  images: CreateProductImage;
  physical: CreateProductPhysical;
}
