import { Body, Controller, Delete,Get, Param, Patch, Post } from '@nestjs/common';

import { CreateLevelMemberDto } from './dto/create-level-member.dto';
import { UpdateLevelMemberDto } from './dto/update-level-member.dto';
import { LevelMemberService } from './level-member.service';

@Controller('level-member')
export class LevelMemberController {
 
}
