import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { Public } from 'src/common/decorators/public.decorations';
import { ApiSecurity } from '@nestjs/swagger';

@ApiSecurity('bearerAuth')
@Controller('mailer')
export class MailerController {
  // constructor(private readonly mailerService: MailerService) {}
  
  // @Post()
  // @Public()
  // async sendMail(@Req() req: Request, @Body() body: { to: string; subject: string; message: string }) {
  //   const { to, subject, message } = body;
  //   await this.mailerService.sendEmail(to, subject, message);
  //   return { message: 'Mail sent' };
  // }

}
