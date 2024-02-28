import { Body, Controller, Delete,Get, Param, Patch, Post } from '@nestjs/common';

import { CreateLevelMemberDto } from './dto/create-level-member.dto';
import { UpdateLevelMemberDto } from './dto/update-level-member.dto';
import { LevelMemberService } from './level-member.service';


// level_name
// "BASIC"
// discount
// 5
// description
// "Mô tả cho cấp độ BASIC"
// icon
// "đường dẫn đến icon"
@Controller('level-member')
export class LevelMemberController {
    
}
