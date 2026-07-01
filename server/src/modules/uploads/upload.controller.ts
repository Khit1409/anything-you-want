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

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.uploadService.uploadImg(file);
  }

  @Post('many')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadManyFile(@UploadedFiles() files: Express.Multer.File[]) {
    return await this.uploadService.uploadManyImg(files);
  }
}
