import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { InformationModule } from './information/information.module';
import { IntroductionModule } from './introduction/introduction.module';
import { OderModule } from './oder/oder.module';
import { ProductModule } from './product/product.module';
import { RegistorModule } from './registor/registor.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
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
  ],
})
export class AppModule {}
