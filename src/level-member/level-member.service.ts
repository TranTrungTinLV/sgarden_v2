import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { LevelMember, MemberLevel } from './schema/levelMember.schema';

@Injectable()
export class LevelMemberService {
 constructor(
    @InjectModel(LevelMember.name) private readonly levelMemberModel: mongoose.Model<LevelMember>
 ){}

 async determineMemberLevel(score: number): Promise<LevelMember> {
    let levelName;
    if(score >= 1 && score < 5){
        levelName = MemberLevel.BASIC;
    }else if(score>=5 && score <=6){
        levelName = MemberLevel.GOLD;
    }else{
        levelName = 'Trường hợp khác'
    }

    //Tìm cấp độ thành viên
    const levelMember = await this.levelMemberModel.findOne({
        level_name: levelName
    }).exec();
    if(!levelMember){
        throw new NotFoundException(`Level member not found for level: ${levelName}`);
    }
    return levelMember;
  }
}
