import { Expose, Type } from 'class-transformer';
import { ResponseDto } from '../../common/dto/response.common.dto';

export class CategoryApi extends ResponseDto {
  data: CategoryDateResponseDto;
}

export class CategoryDateResponseDto {
  @Type(() => CategoryResponseDto)
  categories: Array<CategoryResponseDto>;
}

export class CategoryResponseDto {
  @Expose({ name: '_id' })
  id: string;
  @Expose()
  name: string;
  @Expose()
  slug: string;
}
