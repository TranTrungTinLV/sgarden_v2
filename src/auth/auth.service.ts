import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/auth.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup-dto';
import { LoginDto } from './dto/login-dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async signUp(signupDto: SignupDto): Promise<{ token: string }> {
    const {
      username,
      password,
      email,
      fullname,
      sex,
      birthday,
      phone,
      level_member,
      avatar,
    } = signupDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      username,
      password: hashedPassword,
      email,
      fullname,
      sex,
      birthday,
      phone,
      avatar,
      level_member,
    });
    const token = this.jwtService.sign({
      id: user._id,
    });
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPassWordMatched = await bcrypt.compare(password, user.password);
    if (!isPassWordMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({
      id: user._id,
    });
    return { token };
  }
}
