import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('SGARDEN')
    .setDescription('List API tesing for Sgarden foods by Levi')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Information')
    .addTag('Introduction')
    .addTag('Order')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001).then(() => {
    console.log('successfully deploy server');
  });
}
bootstrap();
