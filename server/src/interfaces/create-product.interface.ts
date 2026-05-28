export interface CreateProductInfo {
  name: string;
  category: string;
  price: number;
  description: string;
  sale: number;
  origin?: string;
  brand?: string;
}
export interface CreateProductClassificationValue {
  name: string;
  img?: string;
}
export interface CreateProductClassification {
  name: string;
  values: Array<CreateProductClassificationValue>;
}
export interface CreateProductShipping {
  flash: boolean;
  normal: boolean;
}
export interface CreateProductImage {
  thumbnail: string;
  details: string[];
}
export interface CreateProduct {
  info: CreateProductInfo;
  classifications: Array<CreateProductClassification>;
  shipping: CreateProductShipping;
  images: CreateProductImage;
}
