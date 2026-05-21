import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './users.repository';
import { RegisterUserAccountRequestDto } from './dto/register.dto';
import { HttpResponse } from '@/src/helpers/httpResponse';
@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly httpHelper: HttpResponse,
  ) {}

  // ============================================================================
  // CREATE OPERATIONS
  // ============================================================================

  /**
   * Đăng ký tài khoản người dùng mới
   * @param dto - Dữ liệu đăng ký (email, mật khẩu, thông tin cá nhân)
   * @returns Response thông báo đăng ký thành công
   * @throws BadRequestException nếu ngày sinh không hợp lệ hoặc email đã tồn tại
   * @throws NotFoundException nếu không thể tạo người dùng
   */
  async register(dto: RegisterUserAccountRequestDto) {
    const dob = new Date(dto.dateOfBirth);

    if (isNaN(dob.getTime())) {
      throw new BadRequestException(
        this.httpHelper.error('Không thể định dạng ngày tháng này!'),
      );
    }

    const existing = await this.repository.findByEmail(dto.emailAddress);

    if (existing) {
      throw new BadRequestException(
        this.httpHelper.error('Email này đã được sử dụng!'),
      );
    }

    const created = await this.repository.create(dto);

    if (!created) {
      throw new NotFoundException(
        this.httpHelper.error('Không thể tạo người dùng mới!'),
      );
    }

    return this.httpHelper.success('Đăng ký thành công!');
  }

  // ============================================================================
  // READ OPERATIONS
  // ============================================================================

  /**
   * Lấy thông tin hồ sơ người dùng
   * Bao gồm địa chỉ, số điện thoại, và thông tin cá nhân
   * @param id - ID của người dùng
   * @returns Response chứa thông tin hồ sơ người dùng (định dạng ngày dd/mm/yyyy)
   * @throws UnauthorizedException nếu thông tin người dùng không tồn tại
   */
  async getInfo(id: string) {
    const data = await this.repository.getInfo(id);

    if (!data) {
      throw new UnauthorizedException(
        this.httpHelper.error('Thông tin người dùng không tồn tại!'),
      );
    }

    const { addresses, phones, info } = data;
    const formatedData = {
      addresses,
      phones,
      info: {
        ...info,
        dateOfBirth: info.dateOfBirth.toString().split('-').reverse().join('-'), // Chuyển từ yyyy-mm-dd -> dd-mm-yyyy
      },
    };

    return this.httpHelper.success(
      'Thông tin người dùng đã sẵn sàng sử dụng!',
      formatedData,
    );
  }
}
