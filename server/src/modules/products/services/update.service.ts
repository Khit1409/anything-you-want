import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/products.repository';
import { HelperService } from '../../helpers/helper.service';
import {
  UpdateProductClassificationDto,
  UpdateProductClassificationValueDto,
  UpdateProductDto,
  UpdateProductInfoDto,
} from '../dtos';

import { CreateProductService } from './create.service';
import mongoose from 'mongoose';
import { ProductClassification } from '../schemas/product-classification.schema';
import { ProductVariant } from '../schemas/product-variant.schema';
import { ReadCategoryService } from '../../categories/services/read.service';
import { ProductInfo } from '../schemas/product-info.schema';

@Injectable()
export class UpdateProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly createService: CreateProductService,
    private readonly readCategoryService: ReadCategoryService,
    private readonly helperService: HelperService,
  ) {}

  updateClassificationValues(values: UpdateProductClassificationValueDto[]) {
    return values.map((value) => ({
      ...value,
      id: value.id ?? String(new mongoose.Types.ObjectId()),
    }));
  }

  updateClassifications(
    classifications: UpdateProductClassificationDto[],
  ): ProductClassification[] {
    return classifications.map((classification) => ({
      ...classification,
      id: classification.id ?? String(new mongoose.Types.ObjectId()),
      values: this.updateClassificationValues(classification.values),
    }));
  }

  /**
   * Variants phụ thuộc vào classifications nên việc update sẽ gần như là tạo mới variants
   * @param productCode
   * @param classifications
   * @returns
   */

  updateVariants(
    productCode: string,
    classifications: ProductClassification[],
    oldVariants: ProductVariant[],
  ): ProductVariant[] {
    const newVariants = this.createService.createVariants(
      productCode,
      classifications,
    );

    const oldVariantMap = new Map(
      oldVariants.map((vari) => [[...vari.optionIds].sort().join('-'), vari]),
    );

    return newVariants.map((newVari) => {
      const key = [...newVari.optionIds].sort().join('-');
      const old = oldVariantMap.get(key);
      if (!old) {
        return { ...newVari, _id: new mongoose.Types.ObjectId() };
      }
      return {
        ...old,
        sku: newVari.sku,
        optionIds: newVari.optionIds,
      };
    });
  }

  async updateInfo(dto: UpdateProductInfoDto): Promise<ProductInfo> {
    const { brand, description, name, origin, price, sale } = dto;
    const newCategoryId = dto.category;

    const category = await this.readCategoryService.getById(newCategoryId);

    return { brand, description, name, origin, category, price, sale };
  }

  async update(dto: UpdateProductDto, id: string) {
    const product = await this.repository.findOne({ id });
    if (!product) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Không tìm thấy sản phẩm!',
        }),
      );
    }
    const { physical, classifications, images, info, shipping } = dto;

    const newInfo = await this.updateInfo(info);
    const newClassifications = this.updateClassifications(classifications);
    const productCode = this.createService.createCode(info.name);
    const newVariants = this.updateVariants(
      productCode,
      newClassifications,
      product.variants,
    );
    product.info = newInfo;
    product.classifications = newClassifications;
    product.physical = physical;
    product.images = images;
    product.shipping = shipping;
    product.variants = newVariants;
    await product.save();

    return { id };
  }
}
