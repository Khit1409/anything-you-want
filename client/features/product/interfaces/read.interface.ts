export interface Category {
  id: string;
  name: string;
  slug: string;
}
export type Categories = Array<Category>;
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

export interface ProductVariant {
  _id: string;
  sku: string;
  optionName: string;
  stock: number;
  extraPrice: number;
  optionIds: string[];
}

export type ProductVariants = ProductVariant[];

export type ProductDimensions = {
  length: number; //cm
  width: number; //cm
  height: number; //cm
};
export interface ProductPhysical {
  weight: number; //gam
  dimensions: ProductDimensions;
}

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
