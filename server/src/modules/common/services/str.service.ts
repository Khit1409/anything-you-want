import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class StrService {
  constructor() {}

  convertDateStringToCorrectFormat(str: string) {
    const partStr = str.split('-') || str.split('/');

    if (partStr.length != 3) {
      throw new BadRequestException(
        'Format of date string is not correct with (DD/MM/YYYY)',
      );
    }
    let day = parseInt(partStr[0]);
    const month = parseInt(partStr[1]);
    let year = parseInt(partStr[2]);

    if (day > year) {
      const temp = year;
      year = day;
      day = temp;
    }

    return year + '-' + month + '-' + day;
  }

  replaceVietnamese(str: string) {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim();
  }

  slugify(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD') // tách dấu tiếng Việt
      .replace(/[\u0300-\u036f]/g, '') // xóa dấu
      .replace(/đ/g, 'd') // xử lý riêng chữ đ
      .replace(/[^a-z0-9\s-]/g, '') // bỏ ký tự đặc biệt
      .trim()
      .replace(/\s+/g, '_') // space -> _
      .replace(/-+/g, '_'); // nhiều - -> 1 _
  }
}
