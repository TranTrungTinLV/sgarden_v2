import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { IntroductionModule } from './introduction/introduction.module';
import { InformationModule } from './information/information.module';
import { AuthModule } from './auth/auth.module';
import { OderModule } from './oder/oder.module';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';
import { RegistorModule } from './registor/registor.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

// import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://trantintin1989:Rfih1w5w3jcuBVIs@cluster0.91ynfyb.mongodb.net/?retryWrites=true&w=majority',
    ),
    IntroductionModule,
    InformationModule,
    AuthModule,
    OderModule,
    ProductModule,
    UsersModule,
    RegistorModule,
  ],
})
export class AppModule {}
