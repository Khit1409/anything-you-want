export class UpdateStockPayload {
  productId: string;
  quantity: number;
  variantId: string;
}

export class ResetStockWhenCancelOrderParams {
  productId: string;
  stockDiscounted: number;
  sku: string;
}
