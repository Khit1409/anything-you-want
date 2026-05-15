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
  async uploadImg(@UploadedFile() file: Express.Multer.File) {
    if (!file)
      throw new UnauthorizedException({
        ...this.httpHelper.error('file not found'),
      });
    const result = await this.cloudinaryService.upload(file, 'images');
    const { public_id, secure_url } = result;
    return this.httpHelper.success('upload is successfully!', {
      url: secure_url,
      public_id,
    });
  }

  async uploadManyImg(@UploadedFiles() files: Express.Multer.File[]) {
    if (files.length == 0) {
      throw new UnauthorizedException({
        ...this.httpHelper.error('not found file in form data!'),
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
      `uploaded ${files.length} is successfully!`,
      data,
    );
  }
}
