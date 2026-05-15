export interface UpdateProductInfo {
  name: string;
  category?: string;
  price: number;
  description: string;
  sale: number;
  origin?: string;
  brand?: string;
}

export interface UpdateProductClassificationValue {
  name: string;
  stock: number;
  extraPrice: number;
  img?: string;
}
export interface UpdateProductClassification {
  name: string;
  values: Array<UpdateProductClassificationValue>;
}
export interface UpdateProductShipping {
  flash: boolean;
  normal: boolean;
}
export interface UpdateProductImage {
  thumbnail: string;
  details: string[];
}
export interface UpdateProduct {
  info?: UpdateProductInfo;
  classification?: Array<UpdateProductClassification>;
  shipping?: UpdateProductShipping;
  images?: UpdateProductImage;
}
