import {
  Injectable,
  UnauthorizedException,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { CloudinaryService } from '@/src/common/cloudinary/cloudinary.service';
import { HttpResponse } from '@/src/helpers/httpResponse';

@Injectable()
export class UploadService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly httpHelper: HttpResponse,
  ) {}

  // ============================================================================
  // UPLOAD OPERATIONS
  // ============================================================================

  /**
   * Tải lên một file ảnh
   * @param file - File ảnh cần tải lên
   * @returns Response chứa URL ảnh và public ID từ Cloudinary
   * @throws UnauthorizedException nếu file không tồn tại
   */
  async uploadImg(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new UnauthorizedException({
        ...this.httpHelper.error('Không tìm thấy file!'),
      });
    }

    const result = await this.cloudinaryService.upload(file, 'images');
    const { public_id, secure_url } = result;

    return this.httpHelper.success('Tải lên ảnh thành công!', {
      url: secure_url,
      public_id,
    });
  }

  /**
   * Tải lên nhiều file ảnh cùng lúc
   * @param files - Danh sách file ảnh cần tải lên
   * @returns Response chứa danh sách URL ảnh và public ID
   * @throws UnauthorizedException nếu không có file nào trong request
   */
  async uploadManyImg(@UploadedFiles() files: Express.Multer.File[]) {
    if (files.length == 0) {
      throw new UnauthorizedException({
        ...this.httpHelper.error('Không tìm thấy file trong form data!'),
      });
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

    return this.httpHelper.success(
      `Tải lên ${files.length} ảnh thành công!`,
      data,
    );
  }
}
