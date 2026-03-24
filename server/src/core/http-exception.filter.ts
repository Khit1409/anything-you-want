import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(InternalServerErrorException)
export class InternalErrorFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(500).json({
      success: false,
      message: exception.getResponse(),
      timestamp: new Date().toISOString(),
    });
  }
}
