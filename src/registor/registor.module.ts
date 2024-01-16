import { Module } from '@nestjs/common';
import { RegistorService } from './registor.service';
import { RegistorController } from './registor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RegiterSchema } from './schema/registor.schema';
import { JwtModule } from '@nestjs/jwt';
// import { UsersModule } from 'src/users/users.module';
// import { UserSchema } from 'src/users/schema/users.schema';

@Module({
  imports: [
    // UsersModule,
    MongooseModule.forFeature([{ name: 'User', schema: RegiterSchema }]), //đkm mày User đéo phải user
    JwtModule.registerAsync({
      // registerAsync with useFactory to read .env variabes
      useFactory: () => ({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '600s' },
      }),
    }),
  ],
  controllers: [RegistorController],
  providers: [RegistorService],
})
export class RegistorModule {}
