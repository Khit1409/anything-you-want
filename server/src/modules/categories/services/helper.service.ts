import { BadRequestException, Injectable } from '@nestjs/common';
import { HelperService } from '../../helpers/helper.service';

@Injectable()
export class HelperCategoryService {
  constructor(private readonly helperService: HelperService) {}

  checkValue<T>(value?: T | null) {
    if (!value) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Danh mục không tồn tại!',
        }),
      );
    }
    return value;
  }
}
