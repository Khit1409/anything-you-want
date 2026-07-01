import { BadRequestException, Injectable } from '@nestjs/common';
import { SharedSellerService } from '../../sellers/services/shared.service';
import * as bcryt from 'bcrypt';
import { HelperService } from '../../common/services/helper.service';
import { TokenService } from '../../common/services/token.service';
import { Role } from '@/shared/enums/roles.enum';
import { SharedUserService } from '../../users/services/shared.service';
import { LoginRequestDto } from '../dtos/auth.request.dto';
import { RoleDto } from '../../common/dto/response.common.dto';

@Injectable()
export class LoginService {
  constructor(
    private readonly helperService: HelperService,
    private readonly tokenService: TokenService,
    private readonly sharedSellerService: SharedSellerService,
    private readonly sharedUserService: SharedUserService,
  ) {}

  async userLogin(email: string, currentPassword: string) {
    const user = await this.sharedUserService.getByEmail(email);
    const correctPassword = await bcryt.compare(
      currentPassword,
      user.hashPassword,
    );
    if (!correctPassword) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Mật khẩu không trùng khớp!',
        }),
      );
    }
    const role = Role.USER;
    const uid = user.id;
    const payload = { email, uid, role: Role.USER };
    const { accessToken, refreshToken } =
      await this.tokenService.createLoginToken(payload);

    return {
      role,
      accessToken,
      refreshToken,
    };
  }

  async sellerLogin(email: string, currentPassword: string) {
    const seller = await this.sharedSellerService.findOneByEmail(email);
    const correctPassword = await bcryt.compare(
      currentPassword,
      seller.hashPassword,
    );
    if (!correctPassword) {
      throw new BadRequestException(
        this.helperService.errorResponse({
          message: 'Mật khẩu không trùng khớp!',
        }),
      );
    }
    const role = Role.SELLER;
    const uid = seller.id;
    const payload = { email, uid, role };
    const { accessToken, refreshToken } =
      await this.tokenService.createLoginToken(payload);

    return {
      role,
      accessToken,
      refreshToken,
    };
  }

  // nơi phân biệt nên sử dụng login nào
  async login(dto: LoginRequestDto) {
    const { loginRole, emailAddress, currentPassword } = dto;
    if (loginRole === RoleDto.SELLER) {
      return await this.sellerLogin(emailAddress, currentPassword);
    }
    return await this.userLogin(emailAddress, currentPassword);
  }
}
