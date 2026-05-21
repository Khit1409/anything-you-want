import { BadRequestException, Injectable } from '@nestjs/common';
import { StoreRepository } from './stores.repository';

@Injectable()
export class StoreService {
  constructor(private readonly repo: StoreRepository) {}

  // ============================================================================
  // HELPER / UTILITY METHODS
  // ============================================================================

  /**
   * Tạo slug cửa hàng từ tên cửa hàng
   * Chuyển đổi thành chữ thường, xóa dấu tiếng Việt, thay space bằng dấu gạch ngang
   * @param name - Tên cửa hàng
   * @returns Slug cửa hàng (ví dụ: "Cửa Hàng ABC" -> "cua-hang-abc")
   */
  createStoreSlug(name: string): string {
    return (
      name
        .toLowerCase()
        // Bỏ dấu tiếng Việt
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        // Chuyển đ -> d
        .replace(/đ/g, 'd')
        // Xóa ký tự đặc biệt
        .replace(/[^a-z0-9\s-]/g, '')
        // Thay space bằng dấu gạch ngang
        .trim()
        .replace(/\s+/g, '-')
        // Xóa nhiều dấu gạch ngang liên tiếp
        .replace(/-+/g, '-')
        // Xóa dấu gạch ngang ở đầu và cuối
        .replace(/^-+|-+$/g, '')
    );
  }

  // ============================================================================
  // READ OPERATIONS
  // ============================================================================

  /**
   * Lấy thông tin cửa hàng theo ID người bán
   * @param sellerId - ID của người bán
   * @returns Thông tin chi tiết cửa hàng
   * @throws BadRequestException nếu cửa hàng không tìm thấy
   */
  async getStoreBySellerId(sellerId: string) {
    const store = await this.repo.getStoreBySellerId(sellerId);
    if (!store) {
      throw new BadRequestException('Cửa hàng không tìm thấy!');
    }
    return store;
  }
}
