import { Module } from '@nestjs/common';
import { RegistorService } from './registor.service';
import { RegistorController } from './registor.controller';
import { MongooseModule } from '@nestjs/mongoose';
// import { RegiterSchema } from './schema/registor.schema';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from 'src/modules/users/schema/users.schema';
import { ConfigService } from '@nestjs/config';
// import { UsersModule } from 'src/users/users.module';
// import { UserSchema } from 'src/users/schema/users.schema';

@Module({
  imports: [
    // UsersModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    // JwtModule.registerAsync({
    //   inject: [ConfigService],
    //   // registerAsync with useFactory to read .env variabes
    //   useFactory: (config: ConfigService) => ({
    //     global: true,
    //     secret: process.env.JWT_SECRET,
    //     signOptions: { expiresIn:  config.get<string | number>('JWT_EXPIRE')}, //import vào .env
    //   }),
    // }),
  ],
  controllers: [RegistorController],
  providers: [RegistorService],
})
export class RegistorModule {}
