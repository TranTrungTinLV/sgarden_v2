import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './modules/auth/auth.module';
import { InformationModule } from './modules/information/information.module';
import { IntroductionModule } from './modules/introduction/introduction.module';
import { OderModule } from './modules/oder/oder.module';
import { ProductModule } from './modules/product/product.module';
import { RegistorModule } from './modules/registor/registor.module';
import { UsersModule } from './modules/users/users.module';
import { CategoryModule } from './modules/category/category.module';
import { DiscountcodeModule } from './modules/discountcode/discountcode.module';
import { LevelMemberModule } from './modules/level-member/level-member.module';

import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from './modules/mailer/mailer.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CountdownModule } from './modules/countdown/countdown.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'storage'),
  }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
      }),
      inject: [ConfigService],
    }),
    IntroductionModule,
    InformationModule,
    AuthModule,
    OderModule,
    ProductModule,
    UsersModule,
    RegistorModule,
    CategoryModule,
    DiscountcodeModule,
    LevelMemberModule,
    MailerModule,
    CountdownModule
  ],
})
export class AppModule {}
