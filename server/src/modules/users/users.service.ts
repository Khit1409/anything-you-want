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
  /**
   * Lấy thông tin người dùng
   * @param dto
   * @returns
   */
  async register(dto: RegisterUserAccountRequestDto) {
    const dob = new Date(dto.dateOfBirth);

    if (isNaN(dob.getTime())) {
      throw new BadRequestException(
        this.httpHelper.error('Can not format this date time!'),
      );
    }

    const existing = await this.repository.findByEmail(dto.emailAddress);

    if (existing) {
      throw new BadRequestException(
        this.httpHelper.error('existing this email!'),
      );
    }

    const created = await this.repository.create(dto);

    if (!created) {
      throw new NotFoundException(
        this.httpHelper.error('Cant create new user!'),
      );
    }
    return this.httpHelper.success('REGISTER SUCCESSFULLY!');
  }
  /**
   * Lấy thông tin người dùng
   * @param id
   * @returns
   */
  async getInfo(id: string) {
    const data = await this.repository.getInfo(id);
    if (!data) {
      throw new UnauthorizedException(
        this.httpHelper.error('This user info is undefine'),
      );
    }
    const { addresses, phones, info } = data;
    const formatedData = {
      addresses,
      phones,
      info: {
        ...info,
        dateOfBirth: info.dateOfBirth.toString().split('-').reverse().join('-'), //đảo ngược chuỗi thành dd/mm/yyyy
      },
    };
    return this.httpHelper.success(
      'User information is ready using!',
      formatedData,
    );
  }
}
