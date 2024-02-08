import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LevelMemberController } from './level-member.controller';
import { LevelMemberService } from './level-member.service';
import { LevelMemberSchema } from './schema/levelMember.schema';
import { UserSchema } from 'src/users/schema/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'LevelMember',
        schema: LevelMemberSchema
      },
      {
        name: 'User',
        schema: UserSchema
      }
    ]),
    // UsersModule
  ],
  controllers: [LevelMemberController],
  providers: [LevelMemberService],
  exports: [LevelMemberService]
})
export class LevelMemberModule {}
