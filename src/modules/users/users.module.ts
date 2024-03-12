import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { LevelMemberModule } from 'src/modules/level-member/level-member.module';
import { LevelMemberSchema } from 'src/modules/level-member/schema/levelMember.schema';
import { UserSchema } from 'src/modules/users/schema/users.schema';
import { UsersService } from 'src/modules/users/users.service';

import { RolesGuard } from '../../common/guard/roles.gaurd';

@Module({
  imports: [
    LevelMemberModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    // JwtModule.registerAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       secret: config.get<string>('JWT_SECRET'),
    //       signOptions: { expiresIn: config.get<string | number>('JWT_EXPIRE') },
    //     };
    //   },
    // }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    {name: 'LevelMember', schema: LevelMemberSchema}]),
  ],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
