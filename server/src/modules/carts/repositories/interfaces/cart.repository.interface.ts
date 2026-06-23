export interface CartItemSave {
  productId: string;
  quantity: number;
  sku: string;
}
export interface CartOwnerSave {
  userId: string;
  sellerId: string;
  storeId: string;
}
export interface CartValueSave {
  product: CartItemSave;
  owner: CartOwnerSave;
}
