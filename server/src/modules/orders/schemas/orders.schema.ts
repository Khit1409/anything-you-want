import { Prop, Schema } from '@nestjs/mongoose';

export enum OrderStatus {
  ACCEPTED = 'accepted',
  PENDING = 'pending',
  FAILED = 'failed',
  RECIVED = 'recived',
}

export enum OrderShipping {
  FLASH = 'flash',
  NORMAL = 'normal',
}
export class OrderVariant {
  @Prop()
  sku: string;
  @Prop({ type: Map, of: String, required: true })
  options: Map<string, string>;
}

export class OrderItem {
  @Prop({ type: String, required: true })
  product_id: string;
  @Prop({ type: String, required: true })
  product_name: string;
  @Prop({ type: Number, required: true })
  quantity: number;
  @Prop({ type: Number, required: true })
  origin_price: number;
  @Prop({ type: OrderVariant, required: true })
  variant: OrderVariant;
}

export class OrderOwner {
  @Prop({ type: String, required: true })
  user_id: string;
  @Prop({ type: String, required: true })
  seller_id: string;
  @Prop({ type: String, required: true })
  store_id: string;
}
export class OrderUserInfoAddress {
  @Prop({ type: String, required: true })
  ward: string;
  @Prop({ type: String, required: true })
  province: string;
  @Prop({ type: String, required: true })
  address_detail: string;
}
export class OrderUserContact {
  @Prop({
    type: String,
    length: 10,
    required: true,
  })
  phone: string;
  @Prop({ type: String, maxLength: 255, required: true })
  email_address: string;
}

export class OrderUserInfo {
  @Prop({ type: String, required: true })
  full_name: string;
  @Prop({ type: OrderUserInfoAddress, required: true })
  address: OrderUserInfoAddress;
  @Prop({ type: OrderUserContact, required: true })
  contact_info: OrderUserContact;
}

export class OrderRating {
  @Prop({ type: String, required: true })
  comment: string;
  @Prop({ type: String, required: true })
  image: string;
  @Prop({ type: Number, min: 0, max: 5, required: true })
  star: number;
}

@Schema({ collection: 'orders', timestamps: true })
export class Order {
  @Prop({ type: OrderItem, required: true })
  items: OrderItem;
  @Prop({ type: OrderOwner, required: true })
  owner: OrderOwner;
  @Prop({
    type: String,
    enum: Object.values(OrderStatus),
    required: true,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;
  @Prop({ type: OrderUserInfo, required: true })
  user_info: OrderUserInfo;
  @Prop({
    type: String,
    required: true,
    enum: Object.values(OrderShipping),
    default: OrderShipping.NORMAL,
  })
  shipping: OrderShipping;
  @Prop({ type: OrderRating, required: false })
  rating: OrderRating;
}
