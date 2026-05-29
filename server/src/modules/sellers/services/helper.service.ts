import { Injectable } from '@nestjs/common';
import { SellerRepository } from '../repositories/sellers.repository';
import { CreateSellerAddressDto, CreateSellerPhoneDto } from '../dtos';

@Injectable()
export class HelperSellerService {
  constructor(private readonly repository: SellerRepository) {}

  async checkExistingByEmail(emailAddress: string) {
    return await this.repository.findOneByEmail(emailAddress);
  }

  async checkExistingById(id: string) {
    return await this.repository.findOneById(id);
  }

  checkDuplicatePhone(phones: CreateSellerPhoneDto[]) {
    return phones.some((phone, index) => {
      return (
        phones.findIndex((p) => p.phoneNumber === phone.phoneNumber) !== index
      );
    });
  }

  checkDuplicateAddress(addresses: CreateSellerAddressDto[]) {
    return addresses.some((address, index) => {
      return (
        addresses.findIndex(
          (add) =>
            address.addressDetail === add.addressDetail &&
            address.province === add.province &&
            address.ward === add.ward,
        ) !== index
      );
    });
  }
}
