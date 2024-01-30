import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { LevelMemberService } from 'src/level-member/level-member.service';

import { User } from './schema/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: mongoose.Model<User>,
    private readonly levelMemberService: LevelMemberService
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

  async updateMemberLevel(username: string) {
    const user = await this.UserModel.findOne({ username });
    console.log(user)
    if (!user) {
      throw new NotFoundException(`User not found with username: ${username}`);
    }

    // Sử dụng LevelMemberService để xác định cấp độ mới

   user.score = (user.score || 0) + 1;
   console.log(user.score);
   await user.save();
    const newLevel = await this.levelMemberService.determineMemberLevel(user.score);
   
    user.level_member = newLevel._id
    console.log(user.level_member)
    return user;
  }

}
