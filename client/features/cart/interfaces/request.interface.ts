export interface CartRequest {
  productId: string;
  sku: string;
  quantity: number;
}

export interface CartUpdateRequest {
  id: string;
  productId: string;
  sku: string;
  quantity: number;
}
