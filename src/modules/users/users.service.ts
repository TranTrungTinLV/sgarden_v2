import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { LevelMemberService } from 'src/modules/level-member/level-member.service';

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
  async findAll(){
    return this.UserModel.find()
  }

  async findWithFilter(keyword:string){
      if(!keyword){
        console.log(`không tồn tên ký tự người dùng`)
        return this.UserModel.find().exec();
      }
      return this.UserModel.find({
        username:{
          $regex: keyword, $options: 'i'
        }
      }).populate('username')
  }
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.UserModel.findOne({ email }).exec();
  }

  async findOneById(id: string): Promise<User> {
    try {
      const user = await this.UserModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException(`User not found with ID: ${id}`);
      }
      return user;
    } catch (error) {
      throw new HttpException('Invalid ID format or other error', HttpStatus.BAD_REQUEST);
    }
  }
  

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
    
    const newLevel = (await this.levelMemberService.determineMemberLevel(user.score))._id;
    console.log(newLevel)
    user.level_member = newLevel; // Gán ObjectId của LevelMember
    await user.save();
    // return user;
  }

  async updateRefreshToken(userId: string,refreshToken: string): Promise<void> {
     await this.UserModel.findByIdAndUpdate(userId,{refreshToken});
  }
}
