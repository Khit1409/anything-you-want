import { Prop, Schema } from '@nestjs/mongoose';

export enum ShippingMethod {
  STANDARD = 'standard',
  EXPRESS = 'express',
  SAMEDAY = 'sameDay',
  NEXTDAY = 'nextDay',
  INTERNATIONAL = 'international',
  PICKUP = 'pickup',
  SCHEDULED = 'scheduled',
}

@Schema({ _id: false })
export class ProductShippingMethodTimes {
  @Prop({ type: Number, required: true, min: 0 })
  prepareDays: number;
  @Prop({ type: Number, required: true, min: 0 })
  deliveryDays: number;
}

@Schema({ _id: false })
export class ProductShippingMethod {
  @Prop({
    enum: ShippingMethod,
    required: true,
  })
  type: ShippingMethod;
  @Prop({ type: Boolean, required: true })
  enabled: boolean;
  @Prop({ type: ProductShippingMethodTimes, required: true })
  times: ProductShippingMethodTimes;
  @Prop({ type: [String], required: false })
  supportedProvinces: string[];
}

@Schema({ _id: false })
export class ProductShipping {
  @Prop({
    type: [ProductShippingMethod],
  })
  methods: ProductShippingMethod[];
}
