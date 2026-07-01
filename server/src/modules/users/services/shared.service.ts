import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/users.repository';
import { HelperService } from '../../common/services/helper.service';

@Injectable()
export class SharedUserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly helperService: HelperService,
  ) {}

  checkValue<V>(value?: V | null) {
    if (!value) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Không tìm thấy dữ liệu người dùng!',
        }),
      );
    }
    return value;
  }

  async getById(id: string) {
    const user = await this.repository.findById(id);
    return this.checkValue(user);
  }

  async getByEmail(emailAddress: string) {
    const user = await this.repository.findByEmail(emailAddress);
    return this.checkValue(user);
  }
}
