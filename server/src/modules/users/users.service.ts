import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './users.repository';
import { RegisterUserAccountRequestDto } from '../auth/dto/auth.request.dto';
import { HttpResponse } from '@/src/helpers/httpResponse';
@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly httpHelper: HttpResponse,
  ) {}
  /**
   *
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
   *
   * @param id
   * @returns
   */
  async getInfo(id: string) {
    const info = await this.repository.getInfo(id);
    if (!info)
      throw new UnauthorizedException(
        this.httpHelper.error('This user info is undefine'),
      );
    return this.httpHelper.success('User information is ready using!', info);
  }
}
