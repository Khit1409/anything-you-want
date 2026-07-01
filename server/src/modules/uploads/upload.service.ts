import {
  Injectable,
  UnauthorizedException,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { CloudinaryService } from '@/shared/cloudinary/cloudinary.service';
import { HelperService } from '../common/services/helper.service';

@Injectable()
export class UploadService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly helperService: HelperService,
  ) {}

  async uploadImg(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new UnauthorizedException(
        this.helperService.errorResponse({ message: 'Không tìm thấy file!' }),
      );
    }

    const result = await this.cloudinaryService.upload(file, 'images');
    const { public_id, secure_url } = result;

    return this.helperService.successResponse({
      message: 'Tải ảnh thành công!',
      data: {
        url: secure_url,
        public_id,
      },
    });
  }

  async uploadManyImg(@UploadedFiles() files: Express.Multer.File[]) {
    if (files.length == 0) {
      throw new UnauthorizedException(
        this.helperService.errorResponse({ message: 'Không tìm thấy file!' }),
      );
    }

    const result = await Promise.all(
      files.map((file) => this.cloudinaryService.upload(file, 'images')),
    );

    const data = result.map((rs) => {
      const { secure_url, public_id } = rs;
      return {
        url: secure_url,
        public_id,
      };
    });

    return this.helperService.successResponse({
      message: `Tải lên ${files.length} ảnh thành công!`,
      data,
    });
  }
}
