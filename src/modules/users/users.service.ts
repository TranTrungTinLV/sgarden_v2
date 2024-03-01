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
  
  //addPurchaseProducts
  async addPurchasedProducts(userId: string, orderIds: string[]): Promise<User> {
    return await this.UserModel.findByIdAndUpdate(userId, {
      $push: { orders: { $each: orderIds } }
    }, { new: true }).exec();
   
  }

  async findOneWithPassword(username: string) {
    const user = await this.UserModel.findOne({ username });
    return user;
  }

  async addPoints(userId: string, points: number): Promise<User> {
    const user = await this.UserModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User not found with ID: ${userId}`);
    }
  
    user.score += points;
    console.log(points)
    // Cập nhật cấp độ thành viên tùy thuộc vào điểm mới
    const newLevel = (await this.levelMemberService.determineMemberLevel(user.score))._id;
    user.level_member = newLevel;
    await user.save();
    return user
  }

  async updateRefreshToken(userId: string,refreshToken: string): Promise<void> {
     await this.UserModel.findByIdAndUpdate(userId,{refreshToken});
  }
  
  async deleteUser(id: string):Promise<User> {
    const result = await this.UserModel.findByIdAndDelete(
      id
    )
    if(!result){
      console.log(`${result}`)
      throw new NotFoundException(`Không tồn tại người dùng này`)
    }
    return result
  }
}
