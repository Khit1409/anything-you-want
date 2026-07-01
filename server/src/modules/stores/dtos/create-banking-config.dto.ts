import { IsString } from 'class-validator';

export class CreateConfigBankingDto {
  @IsString()
  apiKey: string;
  @IsString()
  clientId: string;
  @IsString()
  checkSumKey: string;
}
