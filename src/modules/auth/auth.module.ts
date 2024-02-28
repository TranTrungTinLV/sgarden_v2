import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { LevelMemberModule } from 'src/modules/level-member/level-member.module';
import { MailerModule } from 'src/modules/mailer/mailer.module';
import { JwtStrategy } from 'src/modules/users/jwt.strategy';
import { UsersModule } from 'src/modules/users/users.module';

import { AuthGuard } from '../../common/guard/auth.gaurd';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [
    // LevelMemberModule,
    UsersModule,
    MailerModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: config.get<string | number>('JWT_EXPIRE') },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [JwtModule]
})
export class AuthModule {}
