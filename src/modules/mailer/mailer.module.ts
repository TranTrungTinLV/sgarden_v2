import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerSchema } from './schema/mailer.schema';

@Module({
  imports: [ConfigModule],
   
 
  controllers: [MailerController],
  providers: [MailerService],
  exports: [MailerService]
})
export class MailerModule {}
