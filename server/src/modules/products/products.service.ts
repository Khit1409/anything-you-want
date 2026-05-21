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
import mongoose from 'mongoose';
import { ProductClassification } from './schemas/product-classification.schema';
import { ProductVariant } from './schemas/product-variant.schema';
import { StrHellper } from '@/src/helpers/str.helper';

@Injectable()
export class ProductService {
  constructor(
    private readonly repo: ProductRepository,
    private readonly categoryService: CategoryService,
    private readonly httpHelper: HttpResponse,
    private readonly strHelper: StrHellper,
  ) {}

  // ============================================================================
  // HELPER / UTILITY METHODS
  // ============================================================================

  /**
   * Tạo khóa phân loại cho biến thể sản phẩm
   * Chuyển đổi dấu tiếng Việt và thay thế khoảng trắng bằng dấu gạch dưới
   * @param key - Khóa phân loại (ví dụ: "Màu sắc")
   * @returns Khóa đã định dạng (ví dụ: "Mau_sac")
   */
  createVariantKey(key: string): string {
    return this.strHelper.replaceVietnamese(key).split(' ').join('_');
  }

  /**
   * Tạo mã sản phẩm duy nhất
   * Lấy 3 ký tự đầu của tên sản phẩm (không dấu, không khoảng trắng) + số ngẫu nhiên
   * @param name - Tên sản phẩm (ví dụ: "Áo thun nam")
   * @returns Mã sản phẩm (ví dụ: "ATH-456")
   */
  createProductCode(name: string): string {
    const replaceStrVietnamese = this.strHelper.replaceVietnamese(name);
    return (
      replaceStrVietnamese.split(' ').join('').slice(0, 3).toUpperCase() +
      '-' +
      Math.floor(Math.random() * 1000).toString()
    );
  }

  /**
   * Tạo SKU (Stock Keeping Unit) cho sản phẩm dựa trên mã sản phẩm và các thuộc tính phân loại
   * @param productCode - Mã sản phẩm (ví dụ: ABC-123)
   * @param valueFirst - Giá trị phân loại đầu tiên (bắt buộc)
   * @param valueSecond - Giá trị phân loại thứ hai (tùy chọn)
   * @returns SKU được format chữ hoa (ví dụ: ABC-123-DO-XL)
   * @throws BadRequestException nếu productCode hoặc valueFirst rỗng
   */
  createSku(
    productCode: string,
    valueFirst: string,
    valueSecond?: string,
  ): string {
    // Validation đầu vào
    if (!productCode?.trim() || !valueFirst?.trim()) {
      throw new BadRequestException(
        'productCode và valueFirst không được để trống',
      );
    }

    // Helper function để format giá trị
    const formatValue = (value: string): string => {
      return this.strHelper
        .replaceVietnamese(value)
        .trim()
        .split(' ')
        .join('-')
        .toUpperCase();
    };

    // Build SKU từ productCode + valueFirst
    let sku = `${productCode}-${formatValue(valueFirst)}`;

    // Thêm valueSecond nếu có
    if (valueSecond?.trim()) {
      sku += `-${formatValue(valueSecond)}`;
    }

    return sku;
  }

  /**
   * Tạo danh sách hashtag cho sản phẩm từ tên sản phẩm và thương hiệu
   * Được sử dụng để tìm kiếm và phân loại sản phẩm
   * @param name - Tên sản phẩm (có thể chứa dấu phẩy để phân tách nhiều từ khóa)
   * @param brand - Thương hiệu sản phẩm (tùy chọn)
   * @returns Mảng hashtag (ví dụ: ["#ao-thun", "#nam", "#nike"])
   */
  createHashtags(name: string, brand?: string): string[] {
    let result: string[] = [];

    // Tách tên sản phẩm theo dấu phẩy và xử lý mỗi phần
    const tagName = name
      .split(',')
      .map((str) => this.strHelper.replaceVietnamese(str).split(' ').join('-'));

    result = [...result, ...tagName];

    // Xử lý thương hiệu nếu có
    const tagBrand = brand
      ? brand
          .split(' ')
          .map((str) => this.strHelper.replaceVietnamese(str))
          .join('-')
      : '';

    if (tagBrand.length > 0) {
      result.push(tagBrand);
    }

    return result.map((str) => `#${str}`);
  }

  /**
   * Tạo danh sách biến thể sản phẩm từ các phân loại
   * Xử lý cả trường hợp một phân loại hoặc nhiều phân loại
   * @param productCode - Mã sản phẩm
   * @param classifications - Danh sách phân loại (ví dụ: [{ name: 'Màu', values: [{name: 'Đỏ'}, ...] }])
   * @returns Mảng các biến thể sản phẩm với SKU, giá, và tùy chọn
   */
  createProductVariants(
    productCode: string,
    classifications: Array<ProductClassification>,
  ): ProductVariant[] {
    // Trường hợp: chỉ 1 phân loại (ví dụ: chỉ có Màu sắc)
    if (classifications.length == 1) {
      return classifications.reduce(
        (variants: ProductVariant[], classification) => {
          classification.values.forEach((value) => {
            variants.push({
              extraPrice: value.extraPrice,
              options: {
                [classification.name]: value.name,
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

    // Trường hợp: 2 phân loại trở lên (ví dụ: Màu + Kích cỡ)
    const first = classifications[0];

    return classifications
      .filter((_, index) => index != 0)
      .reduce((variants: ProductVariant[], classification) => {
        classification.values.forEach((classificationValue) => {
          first.values.forEach((firstValue) => {
            const sku = this.createSku(
              productCode,
              firstValue.name,
              classificationValue.name,
            );
            variants.push({
              sku,
              extraPrice:
                firstValue.extraPrice + classificationValue.extraPrice,
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

  // ============================================================================
  // CREATE OPERATIONS
  // ============================================================================

  /**
   * Tạo sản phẩm mới
   * Xử lý tạo mã sản phẩm, SKU, hashtag, biến thể tự động
   * @param createData - Dữ liệu tạo sản phẩm (thông tin, phân loại, ảnh, vận chuyển)
   * @param owner - Chủ sở hữu sản phẩm (sellerId và storeId)
   * @returns Response với thông báo thành công
   * @throws BadRequestException nếu không thể tạo sản phẩm
   */
  async createProduct(
    createData: CreateProduct,
    owner: { sellerId: string; storeId: string },
  ) {
    const { info, shipping, classifications, images } = createData;

    const tags = this.createHashtags(info.name, info.brand);
    const category = await this.categoryService.getById(info.category);
    const categoryId = category._id.toString();
    const categoryData = { name: category.name, id: categoryId };
    const statusData = 'active';
    const productCode = this.createProductCode(info.name);
    const variants = this.createProductVariants(productCode, classifications);

    const data = {
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
      variants,
    };

    const newProduct = await this.repo.create(data);
    if (!newProduct) {
      throw new BadRequestException('Không thể tạo sản phẩm!');
    }
    return this.httpHelper.success('Sản phẩm được tạo thành công!');
  }

  // ============================================================================
  // READ OPERATIONS
  // ============================================================================

  /**
   * Lấy danh sách sản phẩm hiển thị trên trang chủ (mặc định 30 sản phẩm)
   * @param query - Query parameters (limit, page)
   * @returns Response chứa danh sách sản phẩm
   */
  async getProductList(query: GetProductQuery) {
    const limit = query.limit ?? 30;
    const page = query.page ?? 1;
    const skip = page * limit - limit;
    const select = 'info ratingSumary shipping images tags';
    const filter = { limit, skip, select };

    const products = await this.repo.getProductList(filter);
    const data = { products: plainToInstance(ProductResponseDto, products) };

    return this.httpHelper.success(
      'Danh sách sản phẩm đã sẵn sàng sử dụng!',
      data,
    );
  }

  /**
   * Lấy chi tiết sản phẩm theo ID
   * Bao gồm thông tin sản phẩm chi tiết và danh sách sản phẩm liên quan cùng danh mục
   * @param id - ID sản phẩm
   * @returns Response chứa chi tiết sản phẩm và sản phẩm liên quan
   * @throws NotFoundException nếu sản phẩm không tồn tại
   */
  async getDetail(id: string) {
    const product = await this.repo.getProductDetail(id);
    if (!product) {
      throw new NotFoundException('Sản phẩm không tồn tại!');
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
      ...this.httpHelper.success('Chi tiết sản phẩm đã sẵn sàng sử dụng!'),
      data,
    };
  }

  /**
   * Lấy danh sách sản phẩm theo danh mục
   * @param category - Thông tin danh mục (id, name)
   * @returns Danh sách sản phẩm trong danh mục
   */
  async getByCategory(category: ProductCategory) {
    const { id } = category;
    return await this.repo.getProductListByCategory(id);
  }

  /**
   * Lấy danh sách sản phẩm của seller (người bán)
   * @param sellerId - ID của người bán
   * @param query - Query parameters (limit, page)
   * @returns Response chứa danh sách sản phẩm của seller
   */
  async getProductListBySeller(sellerId: string, query: GetProductQuery) {
    const limit = query.limit ?? 30;
    const page = query.page ?? 1;
    const skip = page * limit - limit;
    const select = 'info ratingSumary shipping images tags status';
    const filter = { skip, limit, select };

    const products = await this.repo.getProductListBySeller(sellerId, filter);

    const api = {
      products: plainToInstance(ProductResponseDto, products),
    };

    return this.httpHelper.success(
      'Danh sách sản phẩm của bạn đã sẵn sàng sử dụng!',
      api,
    );
  }

  /**
   * Lấy chi tiết sản phẩm của seller (chỉ seller chủ sở hữu mới có thể xem)
   * @param sellerId - ID của người bán
   * @param productId - ID của sản phẩm
   * @returns Response chứa chi tiết sản phẩm
   * @throws BadRequestException nếu sản phẩm không tồn tại
   */
  async getProductDetailBySeller(sellerId: string, productId: string) {
    const mongooseId = new mongoose.Types.ObjectId(productId);
    const product = await this.repo.getDetailBySeller(sellerId, mongooseId);

    if (!product) {
      throw new BadRequestException(
        this.httpHelper.error('Sản phẩm không tìm thấy!'),
      );
    }

    return this.httpHelper.success('Chi tiết sản phẩm đã sẵn sàng sử dụng!', {
      ...plainToInstance(ProductDetailResponseDto, product),
    });
  }

  // ============================================================================
  // UPDATE OPERATIONS
  // ============================================================================

  /**
   * Cập nhật sản phẩm (chỉ seller chủ sở hữu mới có thể cập nhật)
   * Hỗ trợ cập nhật: thông tin cơ bản, phân loại, ảnh, vận chuyển
   * @param id - ID của sản phẩm
   * @param updateData - Dữ liệu cần cập nhật
   * @param sellerId - ID của người bán
   * @returns Response chứa số lượng trường được cập nhật
   * @throws UnauthorizedException nếu seller không phải chủ sở hữu sản phẩm
   */
  async updateProduct(id: string, updateData: UpdateProduct, sellerId: string) {
    let updateCount = 0;
    const product = await this.repo.getProductDetailBySeller(id, sellerId);

    if (!product) {
      throw new UnauthorizedException('Sản phẩm không tồn tại!');
    }

    const { classification, images, info, shipping } = updateData;

    // Cập nhật phân loại
    if (classification) {
      const oldClassification = [...product.classifications];
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

    // Cập nhật ảnh
    if (images) {
      await product.updateOne({ images });
      updateCount++;
    }

    // Cập nhật thông tin cơ bản
    if (info) {
      const infoUpdated = { ...product.info };

      if (info.category) {
        const newCategory = await this.categoryService.getById(info.category);
        if (!newCategory) {
          throw new UnauthorizedException('Danh mục không tìm thấy!');
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

    // Cập nhật vận chuyển
    if (shipping) {
      await product.updateOne({ shipping });
      updateCount++;
    }

    return this.httpHelper.success('Cập nhật sản phẩm thành công!', {
      updateCount,
    });
  }

  // ============================================================================
  // DELETE OPERATIONS
  // ============================================================================

  /**
   * Xóa sản phẩm (chỉ seller chủ sở hữu mới có thể xóa)
   * @param sellerId - ID của người bán
   * @param productId - ID của sản phẩm cần xóa
   * @returns Response thông báo xóa thành công
   * @throws NotFoundException nếu không tìm thấy sản phẩm để xóa
   */
  async deleteProduct(sellerId: string, productId: string) {
    const deleted = await this.repo.delete(sellerId, productId);
    const { deletedCount } = deleted;

    if (deletedCount == 0) {
      throw new NotFoundException(
        this.httpHelper.error('Có lỗi khi xử lý xóa sản phẩm!'),
      );
    }

    return this.httpHelper.success('Xóa sản phẩm thành công!');
  }
}
