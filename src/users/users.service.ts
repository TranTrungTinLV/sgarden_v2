import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { User } from './schema/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: mongoose.Model<User>,
  ) {
    console.log('UserService contructor');
  }

  async findOne(username: string) {
    return await this.UserModel.findOne({ username }).select(
      'id username role',
    );
  }

  async findOneWithPassword(username: string) {
    const user = await this.UserModel.findOne({ username });
    return user;
  }

  //cập nhật điểm thành viên
  // async updateMemberPoints(userId: string, points: number) {
  //   console.log("Updating points for user slug:", userId);
  //   const user = await this.UserModel.findOne({ slug: userId });
  //   if (!user) {
  //     throw new NotFoundException(`User with slug ${userId} không tìm thấy để cập nhật điểm`);
  //   }
  
  //   user.score = (user.score || 0) + points;
  //   await user.save();
  //   return user;
  // }
}
