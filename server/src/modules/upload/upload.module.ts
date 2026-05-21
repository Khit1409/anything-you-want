import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { CloudinaryModule } from '@/src/common/cloudinary/cloudinary.module';
import { HttpResponse } from '@/src/helpers/httpResponse';

@Module({
  imports: [CloudinaryModule],
  controllers: [UploadController],
  providers: [UploadService, HttpResponse],
  exports: [CloudinaryModule, UploadService],
})
export class UploadModule {}
