import { BadRequestException, Get, HttpStatus, Injectable, NotFoundException, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { error } from 'console';
import * as crypto from 'crypto';
import mongoose from 'mongoose';
import { MailerService } from 'src/modules/mailer/mailer.service';
import { User } from 'src/modules/users/schema/users.schema';
import { UsersService } from 'src/modules/users/users.service';
import { ChangePasswordDto } from './dto/change-password.dto';
// import * as redisStore from 'cache-manager-redis-store';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private readonly mailService: MailerService
  ) {}

  async login(loginIdentifier: string, pwd: string) { //đăng nhập
    // const { email, password } = loginDto;

    // const user = await this.usersService.findOneWithPassword(username);
    const user = await this.usersService.findOneWithEmailorUserName(loginIdentifier)
    console.log(user)
    // Kiểm tra nếu không tìm thấy người dùng
  if (!user) {
    throw new UnauthorizedException('Tài khoản không tồn tại.');
  }

  // Kiểm tra nếu người dùng bị chặn
  if (user.isBlocked) {
    throw new UnauthorizedException('Tài khoản của bạn đã bị khoá.');
  }
    const encryptedPassword = crypto
      .createHash('sha256')
      .update(pwd)
      .digest('hex');

    if (user?.password !== encryptedPassword) {
      throw new UnauthorizedException("thông tin đăng nhập không chính xác");
    }
    // The "sub" (subject) claim identifies the principal that is the subject of the JWT
    const payload = { username: loginIdentifier, sub: user._id, role: user.role };
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

    // Tạo mật khẩu ngẫu nhiên
    const randomPassword = crypto.randomBytes(6).toString('hex');
    const hashedPassword = crypto.createHash('sha256').update(randomPassword).digest('hex');

    // Cập nhật mật khẩu trong cơ sở dữ liệu
    user.password = hashedPassword;
    await user.save();
    // const payload = { email };
    // const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    
    // Gửi email
    await this.mailService.sendEmail(
      email,
      "Đặt lại mật khẩu",
      `Vui lòng nhấp vào đường link sau để đặt lại mật khẩu của bạn: ${randomPassword}`
    )
}
async resetPassword(token: string, newPassword: string): Promise<void> {
  try {
    // Giải mã token
    const decoded = this.jwtService.verify(token);
    const email = decoded.email;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Tiếp tục quá trình đặt lại mật khẩu...
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      throw new UnauthorizedException('Invalid token');
    }
    throw error;
  }
}


//Thay đổi mật khẩu khi đăng nhập
async changePassword(userId: string, changePasswordDto: ChangePasswordDto):Promise<any>{
  const user = await this.usersService.findOneById(userId)
  console.log(user)

  if (!changePasswordDto.oldpassword || !changePasswordDto.newpassword) {
    throw new BadRequestException('Mật khẩu cũ hoặc mật khẩu mới không được rỗng');
  }
  const encryptOldPassword = crypto.createHash('sha256').update(changePasswordDto.oldpassword).digest('hex');
  console.log(encryptOldPassword)
  if(user.password !== encryptOldPassword) {
    throw new UnauthorizedException('Mật khẩu cũ của bạn không chính xác')
  }

  const encryptNewPassword = crypto.createHash('sha256').update(changePasswordDto.newpassword).digest('hex');
  console.log(encryptNewPassword);
  user.password = encryptNewPassword;
  await user.save()
  return { message: 'Mật khẩu đã được thay đổi thành công.' };
}
}