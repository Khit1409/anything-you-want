import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from '@/configs/mailer.config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return mailerConfig(config);
      },
    }),
  ],
  controllers: [EmailsController],
  providers: [EmailsService],
})
export class EmailsModule {}
