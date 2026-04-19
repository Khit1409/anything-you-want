import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateProductDto,
  GetProductQueryDto,
} from './dto/products.request.dto';
import { HttpResponse } from '@/src/helpers/httpResponse';
import { ProductRepository } from './products.repository';
import { CategoryService } from '../categories/categories.service';
import {
  ProductCategory,
  ProductShipping,
  ProductStatus,
} from './schemas/products.schema';
import { plainToInstance } from 'class-transformer';
import { ProductResponseDto } from './dto/products.response.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly repo: ProductRepository,
    private readonly categoryService: CategoryService,
    private readonly httpHelper: HttpResponse,
  ) {}
  /**
   *  get 30 product for view page
   * @param query
   * @returns
   */
  async getProductList(query: GetProductQueryDto) {
    const limit = query.limit ?? 30;
    const page = query.page ?? 1;
    const skip = page * limit - limit;
    const select = 'info ratingSumary shipping images tags';
    const products = await this.repo.getProductList(skip, limit, select);
    const data = { products: plainToInstance(ProductResponseDto, products) };
    return this.httpHelper.success('Products api is ready using!', data);
  }
  /**
   *
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
      product,
      related: plainToInstance(ProductResponseDto, related),
    };
    return {
      ...this.httpHelper.success('Product api is ready using!'),
      data,
    };
  }
  /**
   * @param dto
   * @returns
   */
  async createProduct(
    dto: CreateProductDto,
    owner: { sellerId: string; storeId: string },
  ) {
    const { info, shipping, classification, images, tags } = dto;
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
      classification: classification,
      shipping: shipping as ProductShipping,
      ratingSumary: { total: 0, avg: 5 },
    };
    const newProduct = await this.repo.create(data);
    if (!newProduct) throw new BadRequestException('Product cant created!');
    return this.httpHelper.success('Product is created');
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
