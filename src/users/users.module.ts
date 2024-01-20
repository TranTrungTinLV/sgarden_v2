import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { UserSchema } from 'src/users/schema/users.schema';
import { RolesGuard } from '../common/guard/roles.gaurd';
import { APP_GUARD } from '@nestjs/core';
// import { UsersController } from './users.controller';

@Module({
  imports: [
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
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), //đkm mày User đéo phải user
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