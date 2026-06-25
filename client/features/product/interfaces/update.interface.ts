import {
  ProductClassifications,
  ProductImages,
  ProductPhysical,
  ProductShipping,
  ProductVariants,
} from "./read.interface";

export type UpdateProductPhysical = ProductPhysical;
export type UpdateProductClassifications = ProductClassifications;
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
