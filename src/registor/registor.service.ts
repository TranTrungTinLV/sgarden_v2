import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '../users/schema/users.schema';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
      sex,
      birthday,
      phone,
      level_member,
      fullname,
      avatar,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      role,
    } = signUpDto;

    // Check if the username or email is already taken
    const existingUser = await this.userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      throw new ConflictException('Username or email already taken');
    }

    const encryptedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    const user = new this.userModel({
      username,
      password: encryptedPassword,
      email,
      sex,
      birthday,
      phone,
      level_member,
      fullname,
      avatar,
      role
    });
    await user.save();

    const payload = { username: username, sub: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
