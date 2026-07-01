import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { HelperService } from './helper.service';

@Injectable()
export class EncryptionService {
  constructor(
    private readonly configService: ConfigService,
    private readonly helperService: HelperService,
  ) {}
  encrypt(text: string): string {
    const systemPrivateKey = this.configService.get<string>(
      'PRIVATE_SYSTEM_ENCRYPT_KEY',
    );
    if (!systemPrivateKey) {
      throw new NotFoundException(
        this.helperService.errorResponse({
          message: 'System error, please try again!',
        }),
      );
    }
    const key = Buffer.from(systemPrivateKey, 'hex');
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    const tag = cipher.getAuthTag();
    const arrKey = [
      iv.toString('hex'),
      tag.toString('hex'),
      encrypted.toString('hex'),
    ];
    const result = arrKey.join(':');
    return result;
  }
  decrypt(text: string): string {
    const systemPrivateKey = this.configService.get<string>(
      'PRIVATE_SYSTEM_ENCRYPT_KEY',
    );
    if (!systemPrivateKey) {
      throw new NotFoundException(
        this.helperService.errorResponse({
          message: 'System error, please try again!',
        }),
      );
    }
    const key = Buffer.from(systemPrivateKey, 'hex');
    const [ivHex, authTagHex, encryptedHex] = text.split(':');
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      key,
      Buffer.from(ivHex, 'hex'),
    );
    decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedHex, 'hex')),
      decipher.final(),
    ]);
    const result = decrypted.toString('utf8');
    return result;
  }
}
