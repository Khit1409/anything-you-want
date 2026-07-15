import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/users.repository';
import { HelperService } from '@/modules/common/services/helper.service';

@Injectable()
export class HelperUserService {
  constructor(
    private readonly repsitory: UserRepository,
    private readonly helperService: HelperService,
  ) {}

  async checkExistingUser({
    emailAddress,
    id,
  }: {
    emailAddress?: string;
    id?: string;
  }) {
    if (emailAddress) {
      return await this.repsitory.findByEmail(emailAddress);
    }
    if (!id) {
      throw new BadRequestException(
        this.helperService.errorResponse({ message: 'Không tìm thấy id!' }),
      );
    }
    return await this.repsitory.findById(id);
  }
}
