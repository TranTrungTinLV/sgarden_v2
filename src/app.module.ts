import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IntroductionModule } from './introduction/introduction.module';
import { InformationModule } from './information/information.module';
import { AuthModule } from './auth/auth.module';
import { OderModule } from './oder/oder.module';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';
import { RegistorModule } from './registor/registor.module';

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
  ],
})
export class AppModule {}
