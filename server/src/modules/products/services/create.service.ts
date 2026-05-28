import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/products.repository';
import { CreateProductDto } from '../dtos';
import { ProductClassification } from '../schemas/product-classification.schema';
import { ProductVariant } from '../schemas/product-variant.schema';
import { CategoryService } from '../../categories/categories.service';
import { ProductStatus } from '../schemas/products.schema';
import { ProductMapper } from '../mappers/response.mapper';
import { HelperService } from '../../helpers/helper.service';
import { ProductOwner } from '../schemas/product-owner.schema';

@Injectable()
export class CreateProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly helperService: HelperService,
    private readonly categoryService: CategoryService,
    private readonly mapper: ProductMapper,
  ) {}

  createVariantKey(key: string): string {
    return this.helperService.strToKey(key);
  }

  createCode(name: string): string {
    const replaceStrVietnamese = this.helperService
      .replaceVietnameseStr(name)
      .toUpperCase();
    const strKey = replaceStrVietnamese.split(' ')[0];
    const randomNum = Math.floor(Math.random() * 1000).toString();
    return `${strKey}-${randomNum}`;
  }

  createSku(
    productCode: string,
    valueFirst: string,
    valueSecond?: string,
  ): string {
    if (!productCode?.trim() || !valueFirst?.trim()) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Lỗi khi tạo mã sản phẩm!',
        }),
      );
    }

    const formatValue = (value: string): string => {
      return this.helperService.strToSlug(value).toUpperCase();
    };

    let sku = `${productCode}-${formatValue(valueFirst)}`;

    if (valueSecond?.trim()) {
      sku += `-${formatValue(valueSecond)}`;
    }

    return sku;
  }

  createHashtags(name: string, brand?: string): string[] {
    let result: string[] = [];

    // Tách tên sản phẩm theo dấu phẩy và xử lý mỗi phần
    const tagName = name
      .split(',')
      .map((str) => this.helperService.strToSlug(str));

    result = [...result, ...tagName];

    // Xử lý thương hiệu nếu có
    const tagBrand = brand ? this.helperService.strToSlug(brand) : '';

    if (tagBrand.length > 0) {
      result.push(tagBrand);
    }

    return result.map((str) => `#${str}`);
  }

  createVariants(
    productCode: string,
    classifications: ProductClassification[],
  ) {
    if (classifications.length == 1) {
      return classifications.reduce(
        (variants: Omit<ProductVariant, '_id'>[], classification) => {
          classification.values.forEach((value) => {
            variants.push({
              extraPrice: 0,
              options: {
                [this.createVariantKey(classification.name)]: value.name,
              },
              sku: this.createSku(productCode, value.name),
              stock: 0,
            });
          });
          return variants;
        },
        [],
      );
    }

    const first = classifications[0];

    return classifications
      .filter((_, index) => index != 0)
      .reduce((variants: Omit<ProductVariant, '_id'>[], classification) => {
        classification.values.forEach((classificationValue) => {
          first.values.forEach((firstValue) => {
            const sku = this.createSku(
              productCode,
              firstValue.name,
              classificationValue.name,
            );
            variants.push({
              sku,
              extraPrice: 0,
              options: {
                [this.createVariantKey(first.name)]: firstValue.name,
                [this.createVariantKey(classification.name)]:
                  classificationValue.name,
              },
              stock: 0,
            });
          });
        });
        return variants;
      }, []);
  }

  async create(data: CreateProductDto, owner: ProductOwner) {
    const model = this.repository.getModel();
    const { info, shipping, classifications, images } = data;

    const tags = this.createHashtags(info.name, info.brand);
    const category = await this.categoryService.getById(info.category);
    const categoryId = category._id.toString();
    const categoryData = { name: category.name, id: categoryId };
    const statusData = ProductStatus.INACTIVE;
    const productCode = this.createCode(info.name);
    const variantInsert = this.createVariants(productCode, classifications);

    const payload = {
      info: {
        ...info,
        category: categoryData,
      },
      owner,
      status: statusData as ProductStatus,
      tags,
      images,
      classifications,
      shipping,
      ratingSumary: { total: 0, avg: 5 },
      variants: variantInsert,
    };

    const newProduct = await model.create(payload);

    if (!newProduct) {
      throw new BadRequestException('Không thể tạo sản phẩm!');
    }
    const id = newProduct.toObject()._id;
    return { id };
  }
}
