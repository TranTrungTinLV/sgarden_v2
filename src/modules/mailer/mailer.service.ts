import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';

import * as nodemailer from 'nodemailer'
import { MailMsg } from './schema/mailer.schema';
import { Model } from 'mongoose';

import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(
    private configService: ConfigService,
    ) {}
  async sendEmail(to: string, subject: string, message: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('EMAIL'),

      pass: this.configService.get('PASSWORD'),
      },
    });

    const mailOptions = {
      from: 'trantintin@gmail.com',
      to: to,
      subject: subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);
  }
}
