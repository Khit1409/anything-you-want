import { BadRequestException, Injectable } from '@nestjs/common';

interface HttpPayload {
  message: string;
  status?: number;
  data?: any;
}
interface HttpConfigPayload {
  message: string;
  success: boolean;
  data?: any;
}

@Injectable()
export class HelperService {
  constructor() {}

  responseConfig({ data, success, message }: HttpConfigPayload) {
    return {
      message,
      success,
      timestamp: new Date().toLocaleDateString('vi-VN'),
      data,
    };
  }

  successResponse({ data, message, status }: HttpPayload) {
    return {
      message,
      success: true,
      status,
      timestamp: new Date().toLocaleDateString('vi-VN'),
      data,
    };
  }

  errorResponse({ data, message, status }: HttpPayload) {
    return {
      message,
      success: false,
      status,
      timestamp: new Date().toLocaleDateString('vi-VN'),
      data,
    };
  }

  replaceVietnameseStr(str: string) {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim();
  }

  strToSlug(str: string) {
    const formatStr = this.replaceVietnameseStr(str);
    return formatStr.split(' ').join('-');
  }

  strToKey(str: string) {
    const formatStr = this.replaceVietnameseStr(str);
    return formatStr.split(' ').join('_');
  }

  convertDateStringToCorrectFormat(str: string) {
    const partStr = str.split('-') || str.split('/');

    if (partStr.length != 3) {
      throw new BadRequestException(
        this.errorResponse({
          message: 'Format of date string is not correct with (DD/MM/YYYY)',
        }),
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
}
