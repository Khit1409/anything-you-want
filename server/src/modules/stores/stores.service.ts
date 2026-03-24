import { BadRequestException, Injectable } from '@nestjs/common';
import { StoreRepository } from './stores.repository';

@Injectable()
export class StoreService {
  constructor(private readonly repo: StoreRepository) {}
  /**
   *
   * @param sellerId
   * @returns
   */
  async getStoreBySellerId(sellerId: string) {
    const store = await this.repo.getStoreBySellerId(sellerId);
    if (!store) throw new BadRequestException('Store is not found');
    return store;
  }
  /**
   * create store slug by name in store info
   * @param name
   * @returns
   */
  createStoreSlug(name: string) {
    return (
      name
        .toLowerCase()
        // bỏ dấu tiếng Việt
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        // đ -> d
        .replace(/đ/g, 'd')
        // xóa ký tự đặc biệt
        .replace(/[^a-z0-9\s-]/g, '')
        // thay space bằng -
        .trim()
        .replace(/\s+/g, '-')
        // xóa nhiều dấu - liên tiếp
        .replace(/-+/g, '-')
        // xóa - ở đầu và cuối
        .replace(/^-+|-+$/g, '')
    );
  }
}
