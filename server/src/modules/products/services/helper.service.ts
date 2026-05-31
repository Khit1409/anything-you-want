import { Injectable } from '@nestjs/common';
import { CreateProductShippingMethodDto } from '../dtos';
import { ShippingMethod } from '../schemas/product-shipping.schema';

@Injectable()
export class HelperProductService {
  constructor() {}

  checkingShippingMethod(methods: CreateProductShippingMethodDto[]) {
    const existingTimeZero = methods.find(
      (f) =>
        f.enabled && (f.times.deliveryDays == 0 || f.times.prepareDays == 0),
    );

    const existingUnableStandard = methods.find(
      (f) => f.type === ShippingMethod.STANDARD && !f.enabled,
    );

    const existingSupportProvincesZero = methods.find(
      (f) =>
        f.type !== ShippingMethod.STANDARD && f.supportedProvinces?.length == 0,
    );

    if (
      existingSupportProvincesZero ||
      existingTimeZero ||
      existingUnableStandard
    ) {
      return false;
    }

    return true;
  }
}
