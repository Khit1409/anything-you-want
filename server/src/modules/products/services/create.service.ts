import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/products.repository';
import {
  CreateProductClassificationDto,
  CreateProductDto,
  CreateProductInfoDto,
} from '../dtos';

import { ProductStatus } from '../schemas/products.schema';
import { ProductMapper } from '../mappers/response.mapper';
import { HelperService } from '../../helpers/helper.service';
import { ProductOwner } from '../schemas/product-owner.schema';
import { HelperProductService } from './helper.service';
import mongoose from 'mongoose';
import { ProductClassification } from '../schemas/product-classification.schema';
import { VariantBasic } from '../interfaces/create.interface';
import { ReadCategoryService } from '../../categories/services/read.service';

@Injectable()
export class CreateProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly helperService: HelperService,
    private readonly readCategoryService: ReadCategoryService,
    private readonly helperProductService: HelperProductService,
    private readonly mapper: ProductMapper,
  ) {}

  createCode(name: string): string {
    const replaceStrVietnamese = this.helperService
      .replaceVietnameseStr(name)
      .toUpperCase();
    const strKey = replaceStrVietnamese.split(' ')[0];
    const randomNum = Math.floor(Math.random() * 1000).toString();
    return `${strKey}-${randomNum}`;
  }

  createSku(productCode: string, valueFirst: string): string {
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

    const sku = `${productCode}-${formatValue(valueFirst)}`;

    return sku;
  }

  createHashtags(name: string, brand?: string): string[] {
    let result: string[] = [];

    // Tách tên sản phẩm theo dấu phẩy và xử lý mỗi phần
    const tagName = name
      .split(/['.,']/)
      .map((str) => this.helperService.strToSlug(str));

    result = [...result, ...tagName];

    // Xử lý thương hiệu nếu có
    const tagBrand = brand ? this.helperService.strToSlug(brand) : '';

    if (tagBrand.length > 0) {
      result.push(tagBrand);
    }

    return result.map((str) => `#${str}`);
  }

  createClassifications(dto: CreateProductClassificationDto[]) {
    return dto.map((cls) => ({
      ...cls,
      id: String(new mongoose.Types.ObjectId()),
      values: cls.values.map((clsvl) => ({
        ...clsvl,
        id: String(new mongoose.Types.ObjectId()),
      })),
    }));
  }

  async createInfo(dto: CreateProductInfoDto) {
    const category = await this.readCategoryService.getById(dto.category);
    return { ...dto, category };
  }

  createVariants(
    productCode: string,
    classifications: ProductClassification[],
  ) {
    const varaints: VariantBasic[] = [];

    const generate = (
      current: VariantBasic = {
        extraPrice: 0,
        optionIds: [],
        sku: productCode,
        stock: 0,
      },
      clsIndex: number = 0,
    ) => {
      if (clsIndex === classifications.length) {
        varaints.push(current);
        return;
      }

      classifications[clsIndex].values.forEach((value) => {
        generate(
          {
            ...current,
            sku: this.createSku(productCode, value.name),
            optionIds: [...current.optionIds, value.id],
          },
          clsIndex + 1,
        );
      });
    };
    generate();

    return varaints;
  }
  async create(data: CreateProductDto, owner: ProductOwner) {
    const model = this.repository.getModel();
    const { shipping, images, physical } = data;

    const tags = this.createHashtags(data.info.name, data.info.brand);
    const info = await this.createInfo(data.info);
    const status = ProductStatus.INACTIVE;
    const ratingSumary = { total: 0, avg: 5 };
    const classifications = this.createClassifications(data.classifications);
    const productCode = this.createCode(data.info.name);
    const variants = this.createVariants(productCode, classifications);

    this.helperProductService.checkingShippingMethod(shipping.methods);

    const payload = {
      info,
      owner,
      status,
      tags,
      images,
      classifications,
      shipping,
      ratingSumary,
      physical,
      variants: [],
    };

    const newProduct = await model.create(payload);
    if (!newProduct) {
      throw new BadRequestException('Không thể tạo sản phẩm!');
    }

    await newProduct.updateOne({ variants });

    const { _id } = newProduct.toObject();
    const id = _id.toString();
    return { id };
  }
}
