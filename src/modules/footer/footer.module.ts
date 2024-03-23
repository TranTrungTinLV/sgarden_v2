import { Module } from '@nestjs/common';
import { FooterService } from './footer.service';
import { FooterController } from './footer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/modules/users/users.module';
import { FooterSchema } from './schema/footer.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: 'Footer',schema: FooterSchema}]),UsersModule],
  controllers: [FooterController],
  providers: [FooterService],
})
export class FooterModule {}
