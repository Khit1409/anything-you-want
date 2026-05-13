import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';

/**
 * Sinh cấu hình `MailerOptions` cho NestJS Mailer dựa trên `ConfigService`.
 * - Đọc biến môi trường EMAIL_HOST/EMAIL_PORT/EMAIL_USER/EMAIL_PASS từ `ConfigService`.
 * - Thiết lập template adapter (Handlebars) và đường dẫn template.
 */
export const mailerConfig = (config: ConfigService): MailerOptions => {
  return {
    transport: {
      host: config.get<string>('EMAIL_HOST'),
      port: config.get<number>('EMAIL_PORT'),
      auth: {
        user: config.get<string>('EMAIL_USER'),
        pass: config.get<string>('EMAIL_PASS'),
      },
    },
    defaults: {
      from: '"No Reply" <noreply@example.com>',
    },
    template: {
      adapter: new HandlebarsAdapter(),
      dir: __dirname + '../modules/emails/templates',
    },
  };
};
