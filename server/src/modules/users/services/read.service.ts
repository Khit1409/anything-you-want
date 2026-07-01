import { BadRequestException, Injectable } from '@nestjs/common';
import { HelperService } from '../../common/services/helper.service';
import { UserRepository } from '../repositories/users.repository';

@Injectable()
export class ReadUserService {
  constructor(
    private readonly helperService: HelperService,
    private readonly repository: UserRepository,
  ) {}

  checkValue<R>(value?: R | null) {
    if (!value) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Dữ liệu người dùng không tồn tại!',
        }),
      );
    }
    return value;
  }

  async getProfileById(id: string) {
    const profile = await this.repository.getProfile(id);
    const { info, phones, addresses } = this.checkValue(profile);
    return { info, phones, addresses };
  }
}
