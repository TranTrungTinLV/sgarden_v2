import { Get, HttpStatus, Injectable, NotFoundException, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { error } from 'console';
import * as crypto from 'crypto';
import mongoose from 'mongoose';
import { MailerService } from 'src/modules/mailer/mailer.service';
import { User } from 'src/modules/users/schema/users.schema';
import { UsersService } from 'src/modules/users/users.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private readonly mailService: MailerService
  ) {}

  async login(username: string, pwd: string) { //đăng nhập
    // const { email, password } = loginDto;

    const user = await this.usersService.findOneWithPassword(username);
    console.log(user)
    if(!user || user.isBlocked){
      throw new UnauthorizedException('Tài khoản của người dùng này đã bị khoá')
    }
    const encryptedPassword = crypto
      .createHash('sha256')
      .update(pwd)
      .digest('hex');

    if (user?.password !== encryptedPassword) {
      console.log(HttpStatus);
      throw new UnauthorizedException("lỗi òi");
    }
    // The "sub" (subject) claim identifies the principal that is the subject of the JWT
    const payload = { username: username, sub: user._id, role: user.role };
    const accessToken = this.jwtService.sign(payload,{expiresIn: '1d'}) // sau 5 phút đăng nhập lại
    const refreshToken = this.jwtService.sign(payload,{expiresIn: '7d'}) //trả về cái này đăng nhập trả về user

    user.refreshToken = refreshToken;
    await user.save(); // 7d sau tự cập nhật lại

    await this.usersService.updateRefreshToken(user._id,refreshToken)
    return {
      access_token: await accessToken,
      // refresh_token: await refreshToken
    };
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('Email not found');
    }

    const payload = { email };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    
    // Gửi email
    await this.mailService.sendEmail(
      email,
      "Đặt lại mật khẩu",
      `Vui lòng nhấp vào đường link sau để đặt lại mật khẩu của bạn: ${token}`
    )
}
async resetPassword(token: string, newPassword: string): Promise<void> {
  try {
    const decoded = this.jwtService.verify(token);
    const email = decoded.email;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const hashedPassword = crypto.createHash('sha256').update(newPassword).digest('hex');
      user.password = hashedPassword; 
      await user.save();
    } catch (error) {
      throw new Error('Invalid or expired reset token');
    }
}


}