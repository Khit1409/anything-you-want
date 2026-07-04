import {
  ProductImages,
  ProductPhysical,
  ProductShipping,
  ProductVariants,
} from "./read.interface";

export type UpdateProductPhysical = ProductPhysical;
export interface UpdateProductClassificationValue {
  id?: string;
  name: string;
  img?: string;
}
export interface UpdateProductClassification {
  id?: string;
  name: string;
  values: UpdateProductClassificationValue[];
}
export type UpdateProductClassifications = UpdateProductClassification[];
export type UpdateProductImage = ProductImages;
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

export interface EditProductRequest {
  info: UpdateProductInfo;
  classifications: UpdateProductClassifications;
  shipping: UpdateProductShipping;
  images: UpdateProductImage;
  physical: UpdateProductPhysical;
  variants: UpdateProductVariants;
}
