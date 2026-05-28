import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('uploads')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // ============================================================================
  // UPLOAD ENDPOINTS
  // ============================================================================

  /**
   * Tải lên một file ảnh
   * @param file - File ảnh từ form data (key: 'file')
   * @returns Response chứa URL ảnh và public ID
   */
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.uploadService.uploadImg(file);
  }

  /**
   * Tải lên nhiều file ảnh cùng lúc
   * @param files - Danh sách file ảnh từ form data (key: 'files')
   * @returns Response chứa danh sách URL ảnh và public ID
   */
  @Post('many')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadManyFile(@UploadedFiles() files: Express.Multer.File[]) {
    return await this.uploadService.uploadManyImg(files);
  }
}
