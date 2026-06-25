

export interface CartItem {
  productId: string;
  quantity: number;
  totalPrice: number;
  discounted: number;
  name: string;
  sale: number;
  price: number;
  thumbnail: string;
  sku: string;
}

export interface Cart {
  _id: string;
  product: CartItem;
  createdAt: Date;
  updatedAt: Date;
}

export type Carts = Cart[];
