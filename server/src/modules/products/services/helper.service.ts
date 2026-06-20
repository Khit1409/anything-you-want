import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductShippingMethodDto, ProductQueryDto } from '../dtos';
import { ShippingMethod } from '../schemas/product-shipping.schema';
import { ProductVariant } from '../schemas/product-variant.schema';
import { ProductClassification } from '../schemas/product-classification.schema';
import { HelperService } from '../../helpers/helper.service';
import {
  SearchProducts,
  SortProducts,
} from '../repositories/interfaces/products.repository.interface';

@Injectable()
export class HelperProductService {
  constructor(private helperService: HelperService) {}

  formatQuery(query: ProductQueryDto, select: string, sellerId?: string) {
    const { category, page, priceMax, priceMin, saleMax, saleMin } = query;
    const limit = 30;
    const skip = limit * (page ?? 1) - limit;
    const sort: SortProducts = { limit, skip, select };
    const search: SearchProducts = {};
    if (sellerId) search['owner.sellerId'] = sellerId;
    if (category) search['info.category.id'] = category;
    if (priceMax)
      search['info.price'] = {
        $gte: priceMin ?? 1,
        $lte: priceMax,
      };
    if (saleMax) {
      search['info.sale'] = {
        $gte: saleMin ?? 1,
        $lte: saleMax,
      };
    }

    return { sort, search };
  }

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
        f.type !== ShippingMethod.STANDARD &&
        f.enabled &&
        f.supportedProvinces?.length == 0,
    );

    if (
      existingSupportProvincesZero ||
      existingTimeZero ||
      existingUnableStandard
    ) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message:
            'Cấu hình vận chuyển không hợp lệ: Rỗng, không bật vận chuyển thường, hoặc không có chi tiết nơi hộ trợ vận chuyển!',
        }),
      );
    }
  }

  getClassificationValueName(
    optionIds: string[],
    classifications: ProductClassification[],
  ) {
    return optionIds.reduce((acc, current) => {
      classifications.forEach((cls) => {
        cls.values.forEach((vl) => {
          if (vl.id === current) {
            acc = acc + ` ${vl.name}`;
          }
        });
      });
      return acc.trim().toLocaleUpperCase();
    }, '');
  }

  recordVariantOption(
    classifications: ProductClassification[],
    variants: ProductVariant[],
  ) {
    return variants.map((vari) => {
      const { _id, extraPrice, optionIds, sku, stock } = vari;
      const options = this.getClassificationValueName(
        optionIds,
        classifications,
      );
      return { id: String(_id), extraPrice, sku, stock, options };
    });
  }
}
