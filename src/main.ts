import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express'
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import  helmet from 'helmet'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  // app.useGlobalPipes(new ValidationPipe({
  //   transform: true, // Kích hoạt chuyển đổi tự động
  //   transformOptions: {
  //     enableImplicitConversion: true, // Cho phép chuyển đổi ngầm định
  //   }
  // }));
  
  //Serve static 
  app.useStaticAssets(join(__dirname,'..','storage'),{
    prefix: 'images\introductions'
  })
 
  const config = new DocumentBuilder()
    .setTitle('SGARDEN')
    .setDescription('List API tesing for Sgarden foods by Levi')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      },'bearerAuth'
    )
    .addTag('Auth')
    .addTag('Information')
    .addTag('Introduction')
    .addTag('Order')
    .addTag('CountDown')
    .addTag('Slide')
    .addTag('Slideshows')
    .addTag('Price')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use('/images', express.static('storage'))
  await app.listen(3001).then(() => {
    console.log('successfully deploy server');
  });
}
bootstrap();
