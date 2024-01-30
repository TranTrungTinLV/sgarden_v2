import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { LevelMemberModule } from 'src/level-member/level-member.module';
import { UserSchema } from 'src/users/schema/users.schema';
import { UsersService } from 'src/users/users.service';

import { RolesGuard } from '../common/guard/roles.gaurd';
import { LevelMemberSchema } from 'src/level-member/schema/levelMember.schema';

@Module({
  imports: [
    LevelMemberModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: config.get<string | number>('JWT_EXPIRE') },
        };
      },
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    {name: 'LevelMember', schema: LevelMemberSchema}]), //đkm mày User đéo phải user
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
