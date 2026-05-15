import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpResponse } from '@/src/helpers/httpResponse';
import { ProductRepository } from './products.repository';
import { CategoryService } from '../categories/categories.service';
import { ProductStatus } from './schemas/products.schema';
import { plainToInstance } from 'class-transformer';
import {
  ProductDetailResponseDto,
  ProductResponseDto,
} from './dto/products.response.dto';

import { ProductCategory } from './schemas/product-category.schema';
import { ProductInfo } from './schemas/product-info.schema';
import { CreateProduct } from '@/src/interfaces/create-product.interface';
import { UpdateProduct } from '@/src/interfaces/update-product.inteface';
import { GetProductQuery } from '@/src/interfaces/get-product.interface';

@Injectable()
export class ProductService {
  constructor(
    private readonly repo: ProductRepository,
    private readonly categoryService: CategoryService,
    private readonly httpHelper: HttpResponse,
  ) {}
  /**
   *  get 30 product for view page.
   * @param query
   * @returns
   */
  async getProductList(query: GetProductQuery) {
    const limit = query.limit ?? 30;
    const page = query.page ?? 1;
    const skip = page * limit - limit;
    const select = 'info ratingSumary shipping images tags';
    const products = await this.repo.getProductList(skip, limit, select);
    const data = { products: plainToInstance(ProductResponseDto, products) };
    return this.httpHelper.success('Products api is ready using!', data);
  }
  /**
   * Lấy sản phẩm chi tiết qua id.
   * @param id
   * @returns
   */
  async getDetail(id: string) {
    const product = await this.repo.getProductDetail(id);
    if (!product) {
      throw new NotFoundException('product not found');
    }
    const categoryId = product.info.category.id;
    const neId = product._id;
    const select = 'info ratingSumary shipping images tags';
    const related = await this.repo.getRelated(categoryId, neId, select);
    const data = {
      product: plainToInstance(ProductDetailResponseDto, product),
      related: plainToInstance(ProductResponseDto, related),
    };
    return {
      ...this.httpHelper.success('Product api is ready using!'),
      data,
    };
  }
  /**
   * Create product hashtags
   * @param info
   * @returns trả về 1 array chứa các keyword được chọn qua tên, xuất xứ và thương hiệu của sản phẩm.
   * Tên sản phẩm: Tên sản phẩm được quy định theo hướng dẫn tạo sản phẩm.
   * Tên thương hiệu: Tách các khoản trắng xóa dấu và nối liền với nhau bằng '-'.
   */
  createHashtags(name: string, brand?: string): string[] {
    let result: string[] = [];
    const tagName = name.split(',').map(
      (str) =>
        str
          .toLowerCase()
          .normalize('NFD') // tách dấu tiếng Việt
          .replace(/[\u0300-\u036f]/g, '') // xóa dấu
          .replace(/đ/g, 'd') // xử lý riêng chữ đ
          .replace(/[^a-z0-9\s-]/g, '') // bỏ ký tự đặc biệt
          .trim() // xóa khoảng trắng hai bên
          .split(' ') // tách ra thành mảng qua dấu cách
          .join('-'), // nối lại bằng '-'
    );

    result = [...result, ...tagName];

    const tagBrand = brand
      ? brand
          .split(' ')
          .map((str) =>
            str
              .toLowerCase()
              .normalize('NFD') // tách dấu tiếng Việt
              .replace(/[\u0300-\u036f]/g, '') // xóa dấu
              .replace(/đ/g, 'd') // xử lý riêng chữ đ
              .replace(/[^a-z0-9\s-]/g, '') // bỏ ký tự đặc biệt
              .trim(),
          )
          .join('-')
      : '';

    if (tagBrand.length > 0) {
      result.push(tagBrand);
    }

    return result.map((str) => `#${str}`);
  }
  /**
   * @param dto
   * @returns
   */
  async createProduct(
    createData: CreateProduct,
    owner: { sellerId: string; storeId: string },
  ) {
    const { info, shipping, classification, images } = createData;
    console.log(info);
    const tags = this.createHashtags(info.name, info.brand);
    const category = await this.categoryService.getById(info.category);
    const categoryId = category._id.toString();
    const categoryData = { name: category.name, id: categoryId };
    const statusData = 'active';
    const data = {
      info: {
        ...info,
        category: categoryData,
      },
      owner,
      status: statusData as ProductStatus,
      tags,
      images,
      classification,
      shipping,
      ratingSumary: { total: 0, avg: 5 },
    };
    const newProduct = await this.repo.create(data);
    if (!newProduct) throw new BadRequestException('Product cant created!');
    return this.httpHelper.success('Product is created');
  }
  /**
   * update sản phẩm
   * @param id
   * @param dto
   * @param sellerId
   * @returns
   */
  async updateProduct(id: string, updateData: UpdateProduct, sellerId: string) {
    let updateCount = 0;
    const product = await this.repo.getProductDetailBySeller(id, sellerId);
    if (!product) {
      throw new UnauthorizedException('Product is not define!');
    }
    const { classification, images, info, shipping } = updateData;
    if (classification) {
      const oldClassification = [...product.classification];
      const isNewClassification = classification.filter(
        (classifiUpdate) =>
          !oldClassification.find((f) => f.name === classifiUpdate.name),
      );

      const isUpdate = oldClassification.map((classifi) => {
        let result = { ...classifi };
        classification.forEach((updateClassifi) => {
          if (result.name === updateClassifi.name) {
            result = { ...result, ...updateClassifi };
          }
        });
        return result;
      });

      const lastUpdateClassification = isUpdate.concat(isNewClassification);
      await product.updateOne({ classification: lastUpdateClassification });
      updateCount++;
    }
    if (images) {
      await product.updateOne({ images });
      updateCount++;
    }
    if (info) {
      const infoUpdated = { ...product.info };

      if (info.category) {
        const newCategory = await this.categoryService.getById(info.category);
        if (!newCategory) {
          throw new UnauthorizedException('Category not found!');
        }
        infoUpdated.category = {
          id: newCategory._id.toString(),
          name: newCategory.name,
        };
      }

      Object.keys(info).forEach((key) => {
        if (key !== 'category') {
          infoUpdated[key] = info[key as keyof ProductInfo];
        }
      });

      await product.updateOne({ info: infoUpdated });
      updateCount++;
    }

    if (shipping) {
      await product.updateOne({ shipping });
      updateCount++;
    }

    return this.httpHelper.success('Product is updated!', { updateCount });
  }
  /**
   * @param category
   * @returns
   */
  async getByCategory(category: ProductCategory) {
    const { id } = category;
    return await this.repo.getProductListByCategory(id);
  }
}
