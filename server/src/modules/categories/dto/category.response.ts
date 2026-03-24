import { ResponseDto } from '../../common/dto/response.common.dto';

export class CategoryApi extends ResponseDto {
  data: CategoryDateResponseDto;
}

export class CategoryDateResponseDto {
  categories: Array<CategoryResponseDto>;
}

export class CategoryResponseDto {}
