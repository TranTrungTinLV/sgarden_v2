import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

  // async findOneEmail(email:string): Promise<boolean> {
  //   let userDb = await this.UserModel.findOne({email: email});
  //   if(!userDb) {
  //     throw new HttpException("Login not found email",HttpStatus.NOT_FOUND);
  //   }
  // }

  async findOneWithPassword(username: string) {
    const user = await this.UserModel.findOne({ username });
    return user;
  }

  async updateScoreAndLevel(username: string, points: number){
    const user = await this.UserModel.findOne({username});
    if (!user) {
      throw new NotFoundException(`User not found with ID: ${user}`);
    }

    user.score += points;
    await user.save();
    
    const newLevel = (await this.levelMemberService.determineMemberLevel(user.score));

    user.level_member = newLevel.level_name; // Gán ObjectId của LevelMember
    await user.save();
    // return user;
  }

}
