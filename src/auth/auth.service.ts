import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as crypto from 'crypto';
import { error } from 'console';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schema/users.schema';
import mongoose from 'mongoose';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,

  ) {}

  async login(username: string, pwd: string) { //đăng nhập
    // const { email, password } = loginDto;

    const user = await this.usersService.findOneWithPassword(username);
    console.log(user)
    const encryptedPassword = crypto
      .createHash('sha256')
      .update(pwd)
      .digest('hex');

    if (user?.password !== encryptedPassword) {
      console.log(HttpStatus);
      throw new UnauthorizedException("lỗi òi");
    }
    // The "sub" (subject) claim identifies the principal that is the subject of the JWT
    const payload = { username: username, sub: user._id };
    const accessToken = this.jwtService.sign(payload,{expiresIn: '5m'}) // sau 5 phút đăng nhập lại
    const refreshToken = this.jwtService.sign(payload,{expiresIn: '7d'})
    return {
      access_token: await accessToken,
    };
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('Email not found');
    }

    const payload = { email };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    console.log(token);
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