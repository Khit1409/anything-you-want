import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { SellerRepository } from './sellers.repository';
import { CreateSellerDto, CreateSellerPhoneDto } from './dto/create-seller.dto';
import { HttpResponse } from '@/src/helpers/httpResponse';
import { StrHellper } from '@/src/helpers/str.helper';
import { StoreService } from '../stores/stores.service';
import { StoreRepository } from '../stores/stores.repository';

@Injectable()
export class SellerService {
  constructor(
    private readonly repo: SellerRepository,
    private readonly httpHellper: HttpResponse,
    private readonly strHellper: StrHellper,
    private readonly storeService: StoreService,
    private readonly storeRepo: StoreRepository,
  ) {}

  // ============================================================================
  // HELPER / UTILITY METHODS
  // ============================================================================

  /**
   * Kiểm tra xem có số điện thoại trùng lặp trong danh sách
   * @param phones - Danh sách số điện thoại
   * @returns True nếu có số điện thoại trùng lặp, False nếu không
   */
  checkExistSamePhone(phones: CreateSellerPhoneDto[]): boolean {
    const hasDuplicate = phones.some((phone, index) => {
      return (
        phones.findIndex((p) => p.phoneNumber === phone.phoneNumber) !== index
      );
    });
    return hasDuplicate;
  }

  // ============================================================================
  // CREATE OPERATIONS
  // ============================================================================

  /**
   * Tạo tài khoản người bán mới
   * Tạo người bán kèm thông tin cửa hàng, số điện thoại
   * @param dto - Dữ liệu tạo người bán (thông tin cá nhân, cửa hàng, mật khẩu)
   * @returns Response thông báo tạo thành công
   * @throws BadRequestException nếu email, store email hoặc số điện thoại trùng lặp
   * @throws BadRequestException nếu không thể tạo tài khoản
   */
  async createSeller(dto: CreateSellerDto) {
    const { currentPassword, emailAddress, info, phones, store } = dto;

    // Kiểm tra email người bán đã tồn tại
    const existing = await this.repo.findByEmail(emailAddress);
    if (existing) {
      throw new BadRequestException('Email đã được sử dụng!');
    }

    // Kiểm tra email cửa hàng đã tồn tại
    const existingStoreEmail = await this.storeRepo.getByStoreEmail(
      store.info.emailAddress,
    );
    if (existingStoreEmail) {
      throw new BadRequestException('Email cửa hàng đã tồn tại!');
    }

    // Kiểm tra số điện thoại trùng lặp
    if (this.checkExistSamePhone(phones)) {
      throw new BadRequestException('Số điện thoại bị trùng lặp!');
    }

    // Định dạng ngày sinh
    const formatDate = this.strHellper.convertDateStringToCorrectFormat(
      info.dateOfBirth,
    );

    // Hash mật khẩu
    const hashPassword = await bcrypt.hash(currentPassword, 10);

    // Chuẩn bị dữ liệu cửa hàng
    const hashStoreCode = await bcrypt.hash(store.storeCode, 10);
    const storeData = {
      ...store,
      storeCode: hashStoreCode,
      info: {
        ...store.info,
        slug: this.storeService.createStoreSlug(store.info.name),
        emailAddress: store.info.emailAddress ?? emailAddress,
      },
    };

    // Chuẩn bị dữ liệu thông tin cá nhân
    const infoData = { ...info, dateOfBirth: formatDate };

    // Tạo người bán mới
    const newSeller = await this.repo.create(
      {
        ...dto,
        info: infoData,
        store: storeData,
      },
      hashPassword,
    );

    if (!newSeller || !newSeller.store) {
      throw new BadRequestException('Không thể tạo tài khoản người bán mới!');
    }

    return {
      ...this.httpHellper.success('Người bán mới được tạo thành công!'),
    };
  }

  // ============================================================================
  // READ OPERATIONS
  // ============================================================================

  /**
   * Kiểm tra người bán tồn tại theo ID
   * @param sellerId - ID của người bán
   * @returns Thông tin người bán
   * @throws BadRequestException nếu người bán không tồn tại
   */
  async checkExistingSeller(sellerId: string) {
    const seller = await this.repo.getById(sellerId);
    if (!seller) {
      throw new BadRequestException('Người bán không tìm thấy!');
    }
    return seller;
  }

  /**
   * Lấy hồ sơ người bán
   * @param id - ID của người bán
   * @returns Response chứa thông tin hồ sơ người bán
   * @throws UnauthorizedException nếu người bán không tồn tại
   */
  async getSellerProfile(id: string) {
    const seller = await this.repo.getById(id);
    if (!seller) {
      throw new UnauthorizedException('Không tìm thấy người bán với ID này!');
    }

    return this.httpHellper.success('Lấy hồ sơ người bán thành công!', seller);
  }
}
