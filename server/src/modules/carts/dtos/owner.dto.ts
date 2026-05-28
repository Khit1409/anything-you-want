import { Expose } from 'class-transformer';

export class OwnerResponseDto {
  @Expose()
  userId: string;
}
