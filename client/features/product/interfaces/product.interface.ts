import { ApiResponse } from "../../common/interfaces/common.interface";

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
  slug: string;
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
  id: string;
  name: string;
  img?: string;
}

export type ProductClassificationValues = ProductClassificationValue[];

export interface ProductClassification {
  id: string;
  name: string;
  values: ProductClassificationValues;
}

export type ProductClassifications = ProductClassification[];

/* -------------------------------------------------------------------------- */
/*                                  VARIANT                                   */
/* -------------------------------------------------------------------------- */

export interface ProductVariant {
  _id: string;
  sku: string;
  optionName: string;
  stock: number;
  extraPrice: number;
  optionIds: string[];
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
  _id: string;

  info: ProductInfo;

  tags: string[];

  ratingSumary: ProductRating;

  shipping: ProductShipping;

  images: ProductImages;

  status: ProductStatus;
}

export interface SellerProductPreview {
  id: string;
}

export type ProductPreviews = ProductPreview[];

export interface ProductDetail extends ProductPreview {
  classifications: ProductClassifications;

  variants: ProductVariants;

  physical: ProductPhysical;

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

export type FilterCost = {
  max: number;
  min: number;
};

export interface GetProductTableQuery extends GetProductPreviewRequest {
  category?: string; //id
  price?: FilterCost;
  sale?: FilterCost;
}

export interface CreateProductRequest {
  info: CreateProductInfo;
  classifications: CreateProductClassifications;
  shipping: CreateProductShipping;
  images: CreateProductImage;
  physical: CreateProductPhysical;
}

export interface EditProductRequest {
  info: UpdateProductInfo;
  classifications: UpdateProductClassifications;
  shipping: UpdateProductShipping;
  images: UpdateProductImage;
  physical: CreateProductPhysical;
  variants: UpdateProductVariants;
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

export interface CreateProductApiResponse extends ApiResponse {
  data: { id: string };
}
export interface DeleteProductResponse extends ApiResponse {
  data: { isDeleted: boolean };
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
  supportedProvinces: string[];
  times: CreateProductShippingTime;
}
export type CreateProductVariants = Omit<ProductVariant, "id">[];

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
export interface UpdateProductImage {
  thumbnail: string;
  details: string[];
}

export type UpdateProductPhysical = ProductPhysical;
export type UpdateProductClassifications = ProductClassifications;

export type UpdateProductShipping = ProductShipping;

export interface UpdateProductInfo {
  name: string;
  category: string;
  price: number;
  sale: number;
  description: string;
  brand?: string;
  origin?: string;
}

export type UpdateProductVariants = ProductVariants;
