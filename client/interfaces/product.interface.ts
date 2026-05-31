import { ApiResponse } from "./common.interface";

/* -------------------------------------------------------------------------- */
/*                                    ENUM                                    */
/* -------------------------------------------------------------------------- */

export enum ProductStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  ZERO = "zero",
}

export enum ShippingMethod {
  STANDARD = "standard",
  EXPRESS = "express",
  SAMEDAY = "sameDay",
  NEXTDAY = "nextDay",
  INTERNATIONAL = "international",
  PICKUP = "pickup",
  SCHEDULED = "scheduled",
}

/* -------------------------------------------------------------------------- */
/*                               SHARED TYPES                                 */
/* -------------------------------------------------------------------------- */

export interface ProductCategory {
  id: string;
  name: string;
}

export interface ProductRating {
  avg: number;
  total: number;
}

export interface ProductImages {
  thumbnail: string;
  details: string[];
}

export interface ProductInfo {
  name: string;
  price: number;
  sale: number;
  description: string;

  category: ProductCategory;

  brand?: string;
  origin?: string;
}

export interface ProductShippingTime {
  prepareDays: number;
  deliveryDays: number;
}

export interface ProductShippingMethod {
  type: ShippingMethod;
  enabled: boolean;
  times: ProductShippingTime;
  supportedProvinces: string[];
}

export type ProductShippingMethods = ProductShippingMethod[];

export interface ProductShipping {
  methods: ProductShippingMethods;
}

/* -------------------------------------------------------------------------- */
/*                              CLASSIFICATION                                */
/* -------------------------------------------------------------------------- */

export interface ProductClassificationValue {
  name: string;
  img?: string;
}

export type ProductClassificationValues = ProductClassificationValue[];

export interface ProductClassification {
  name: string;
  values: ProductClassificationValues;
}

export type ProductClassifications = ProductClassification[];

/* -------------------------------------------------------------------------- */
/*                                  VARIANT                                   */
/* -------------------------------------------------------------------------- */

export interface ProductVariant {
  id: string;
  sku: string;
  stock: number;
  extraPrice: number;
  options: Record<string, string>;
}

export type ProductVariants = ProductVariant[];

/* -------------------------------------------------------------------------- */
/*                                  PHYSICAL                                  */
/* -------------------------------------------------------------------------- */
export type ProductDimensions = {
  length: number; //cm
  width: number; //cm
  height: number; //cm
};
export interface ProductPhysical {
  weight: number; //gam
  dimensions: ProductDimensions;
}
/* -------------------------------------------------------------------------- */
/*                                  PRODUCT                                   */
/* -------------------------------------------------------------------------- */

export interface ProductPreview {
  id: string;

  info: ProductInfo;

  tags: string[];

  ratingSumary: ProductRating;

  shipping: ProductShipping;

  images: ProductImages;

  status: ProductStatus;
}

export type ProductPreviews = ProductPreview[];

export interface ProductDetail extends ProductPreview {
  classifications: ProductClassifications;

  variants: ProductVariants;

  createdAt: string;

  updatedAt: string;
}

export interface ProductOwner {
  sellerId: string;
  storeId: string;
}

/* -------------------------------------------------------------------------- */
/*                                  REQUEST                                   */
/* -------------------------------------------------------------------------- */

export interface GetProductPreviewRequest {
  page: number;
}

export interface CreateProductRequest {
  info: CreateProductInfo;
  classifications: CreateProductClassifications;
  shipping: CreateProductShipping;
  images: CreateProductImage;
  physical: CreateProductPhysical;
}

/* -------------------------------------------------------------------------- */
/*                                  RESPONSE                                  */
/* -------------------------------------------------------------------------- */

export interface ProductPreviewDataResponse {
  products: ProductPreviews;
  request: GetProductPreviewRequest;
}

export interface ProductDetailDataApiResponse {
  product: ProductDetail | null;
  relateds: ProductPreviews;
}

export interface ProductPreviewApiResponse extends ApiResponse {
  data: ProductPreviewDataResponse;
}

export interface ProductDetailApiResponse extends ApiResponse {
  data: ProductDetailDataApiResponse;
}

/* -------------------------------------------------------------------------- */
/*                              CREATE PRODUCT                                */
/* -------------------------------------------------------------------------- */

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
  supportedProvinces?: string[];
  times: CreateProductShippingTime;
}

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

/* -------------------------------------------------------------------------- */
/*                              UPDATE PRODUCT                                */
/* -------------------------------------------------------------------------- */

export interface UpdateProductVariant {
  id: string;
  stock?: number;
  extraPrice?: number;
}

export type UpdateProductVariants = UpdateProductVariant[];
