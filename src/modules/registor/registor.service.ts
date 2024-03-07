import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import { Model } from 'mongoose';

import { User } from '../users/schema/users.schema';
import { CreateRegistorDto } from './dto/create-registor.dto';


@Injectable()
export class RegistorService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {
    console.log('RegisterService constructor');
  }

  async registerUser(signUpDto: CreateRegistorDto) {
    const {
      username,
      password,
      email,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      role,
      slug
    } = signUpDto;

    // if(!this.validateEmail(email)) {
    //   throw new HttpException('email không hợp lệ', HttpStatus.BAD_REQUEST);
    // }
    if (email && !this.validateEmail(email)) {
      throw new HttpException('Email không hợp lệ hoặc không phải là địa chỉ Gmail', HttpStatus.BAD_REQUEST);
    }

    // Check if the username or email is already taken
    const existingUser = await this.userModel.findOne({ username });
    const existingEmail = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new ConflictException('Username already taken');
    }
    if (existingEmail) {
      throw new ConflictException('Email already taken');
    }

    const encryptedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    const user = new this.userModel({
      username,
      password: encryptedPassword,
      role,
      email: email ? email : '',
      slug
    });
    await user.save();

    const payload = { username: username, role:user.role, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  validateEmail(email: string) {
    const regex = /^[\w-\.]+@gmail\.com$/;
    return regex.test(email);
  }

  
}
