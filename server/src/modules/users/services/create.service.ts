import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HelperService } from '../../common/services/helper.service';
import { UserRepository } from '../repositories/users.repository';
import { RegisterUserAccountRequestDto } from '../dtos/register.dto';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly helperService: HelperService,
    private readonly repository: UserRepository,
  ) {}

  async create(dto: RegisterUserAccountRequestDto) {
    const dob = new Date(dto.dateOfBirth);

    if (isNaN(dob.getTime())) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Không thể định dạng ngày tháng năm!',
        }),
      );
    }

    const existing = await this.repository.findByEmail(dto.emailAddress);
    if (existing) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Người dùng với email này đã tồn tại!',
        }),
      );
    }
    const created = await this.repository.create(dto);
    if (!created) {
      throw new NotFoundException(
        this.helperService.errorResponse({ message: 'Đăng ký thật bại!' }),
      );
    }

    return true;
  }
}
