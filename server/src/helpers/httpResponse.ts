import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpResponse {
  constructor() {}

  success(message: string, data?: any) {
    return {
      success: true,
      message,
      data,
      timestamp: new Date().toLocaleDateString('vi-VN'),
    };
  }
  error(message: string) {
    return {
      success: false,
      message,
      timestamp: new Date().toLocaleDateString('vi-VN'),
    };
  }
}
