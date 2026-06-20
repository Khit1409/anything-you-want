import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class StrHellper {
  constructor() {}
  /**
   * 14-09-2005
   * @param str
   * @returns
   */
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
  /**
   *
   */
  replaceVietnamese(str: string) {
    return str
      .toLowerCase()
      .normalize('NFD') 
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd') 
      .replace(/[^a-z0-9\s-]/g, '')
      .trim();
  }
}
