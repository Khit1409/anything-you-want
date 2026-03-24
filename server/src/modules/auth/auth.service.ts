import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import bcrypt from 'node_modules/bcryptjs';

import { CookieMap } from 'src/interfaces/cookies.interface';
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
  /**
   * client login
   * @param dto
   * @returns
   */
  async clientLogin(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const { emailAddress, currentPassword } = dto;

    const user = await this.userRepository.findByEmail(emailAddress);
    if (!user) {
      throw new UnauthorizedException(
        this.httpHelper.error('User is undifine!'),
      );
    }

    const comparePassword = await bcrypt.compare(
      currentPassword,
      user.hashPassword,
    );

    if (!comparePassword) {
      throw new BadRequestException(
        this.httpHelper.error('Password is not compare!'),
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
      ...this.httpHelper.success('Login is successfully!', data),
      token,
    };
  }
  /**
   *
   * @param dto
   * @returns
   */
  async sellerLogin(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const { loginRole, currentPassword, emailAddress } = dto;

    if (loginRole !== RoleDto.SELLER) {
      throw new BadRequestException(
        this.httpHelper.error('Role is not seller!'),
      );
    }
    const seller = await this.sellerRepository.findByEmail(emailAddress);

    if (!seller) {
      throw new UnauthorizedException(
        this.httpHelper.error('Seller is not define!'),
      );
    }
    const comparePassword = await bcrypt.compare(
      currentPassword,
      seller.hashPassword,
    );

    if (!comparePassword) {
      throw new BadRequestException(
        this.httpHelper.error('Password is not compare!'),
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
      ...this.httpHelper.success('Login is successfully!', data),
      token,
    };
  }
  /**
   * authentication
   */
  async clientAuth(req: Request): Promise<AuthenticationResponseDto> {
    const cookies = req.cookies as CookieMap;
    const accessToken = cookies.access_token;
    if (!accessToken) {
      throw new UnauthorizedException(
        this.httpHelper.error(
          'Token is not found, can be is not login or expire token!',
        ),
      );
    }
    const decoded: AuthenticationDataDto =
      await this.jwtService.verifyAsync(accessToken);
    if (!decoded) {
      throw new NotFoundException(this.httpHelper.error("can't verify token!"));
    }
    const data = { decoded };
    return this.httpHelper.success('Authentication is successfully!', data);
  }
}
