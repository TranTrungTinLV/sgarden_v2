import { PartialType } from '@nestjs/swagger';

import { CreateLevelMemberDto } from './create-level-member.dto';

export class UpdateLevelMemberDto extends PartialType(CreateLevelMemberDto) {}
