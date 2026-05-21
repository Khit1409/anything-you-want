import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import bcrypt from '@/node_modules/bcryptjs';

import { CookieMap } from '@/src/interfaces/cookies.interface';
import { LoginRequestDto } from './dto/auth.request.dto';
import { RoleDto } from '../common/dto/response.common.dto';
import {
  AuthenticationDataDto,
  AuthenticationResponseDto,
  LoginResponseDto,
} from './dto/auth.response.dto';
import { HttpResponse } from '@/src/helpers/httpResponse';
import { UserRepository } from '../users/users.repository';
import { SellerRepository } from '../sellers/sellers.repository';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sellerRepository: SellerRepository,
    private readonly httpHelper: HttpResponse,
    private readonly jwtService: JwtService,
  ) {}

  // ============================================================================
  // LOGIN OPERATIONS
  // ============================================================================

  /**
   * Đăng nhập cho khách hàng (người dùng)
   * Xác thực email và mật khẩu, tạo JWT token
   * @param dto - Dữ liệu đăng nhập (emailAddress, currentPassword)
   * @returns Response chứa token và thông tin vai trò
   * @throws UnauthorizedException nếu tài khoản không tồn tại
   * @throws BadRequestException nếu mật khẩu không chính xác
   */
  async clientLogin(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const { emailAddress, currentPassword } = dto;

    const user = await this.userRepository.findByEmail(emailAddress);
    if (!user) {
      throw new UnauthorizedException(
        this.httpHelper.error('Người dùng không tồn tại!'),
      );
    }

    const comparePassword = await bcrypt.compare(
      currentPassword,
      user.hashPassword,
    );

    if (!comparePassword) {
      throw new BadRequestException(
        this.httpHelper.error('Mật khẩu không chính xác!'),
      );
    }

    const tokenPayload = {
      uid: user.id,
      role: 'user' as RoleDto,
      email: user.emailAddress,
    };

    const token = await this.jwtService.signAsync(tokenPayload, {
      expiresIn: '1d',
    });

    const data = { role: tokenPayload.role };

    return {
      ...this.httpHelper.success('Đăng nhập thành công!', data),
      token,
    };
  }

  /**
   * Đăng nhập cho người bán (seller)
   * Xác thực email, mật khẩu và vai trò seller, tạo JWT token
   * @param dto - Dữ liệu đăng nhập (emailAddress, currentPassword, loginRole)
   * @returns Response chứa token và thông tin vai trò
   * @throws BadRequestException nếu vai trò không phải seller
   * @throws UnauthorizedException nếu tài khoản người bán không tồn tại
   * @throws BadRequestException nếu mật khẩu không chính xác
   */
  async sellerLogin(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const { loginRole, currentPassword, emailAddress } = dto;

    if (loginRole !== RoleDto.SELLER) {
      throw new BadRequestException(
        this.httpHelper.error('Vai trò không phải người bán!'),
      );
    }

    const seller = await this.sellerRepository.findByEmail(emailAddress);

    if (!seller) {
      throw new UnauthorizedException(
        this.httpHelper.error('Người bán không tồn tại!'),
      );
    }

    const comparePassword = await bcrypt.compare(
      currentPassword,
      seller.hashPassword,
    );

    if (!comparePassword) {
      throw new BadRequestException(
        this.httpHelper.error('Mật khẩu không chính xác!'),
      );
    }

    const tokenPayload = {
      uid: seller.id,
      role: 'seller' as RoleDto,
      email: seller.emailAddress,
    };

    const token = await this.jwtService.signAsync(tokenPayload, {
      expiresIn: '1d',
    });

    const data = { role: tokenPayload.role };

    return {
      ...this.httpHelper.success('Đăng nhập thành công!', data),
      token,
    };
  }

  // ============================================================================
  // AUTHENTICATION OPERATIONS
  // ============================================================================

  /**
   * Xác thực token của khách hàng
   * Kiểm tra và giải mã token từ cookies
   * @param req - Request object chứa cookies
   * @returns Response chứa thông tin xác thực (uid, role, email)
   * @throws UnauthorizedException nếu token không tồn tại hoặc hết hạn
   * @throws NotFoundException nếu không thể xác minh token
   */
  async clientAuth(req: Request): Promise<AuthenticationResponseDto> {
    const cookies = req.cookies as CookieMap;
    const accessToken = cookies.access_token;

    if (!accessToken) {
      throw new UnauthorizedException(
        this.httpHelper.error(
          'Token không tìm thấy, vui lòng đăng nhập hoặc token đã hết hạn!',
        ),
      );
    }

    const decoded: AuthenticationDataDto =
      await this.jwtService.verifyAsync(accessToken);

    if (!decoded) {
      throw new NotFoundException(
        this.httpHelper.error('Không thể xác minh token!'),
      );
    }

    const data = { ...decoded };
    return this.httpHelper.success('Xác thực thành công!', data);
  }
}
