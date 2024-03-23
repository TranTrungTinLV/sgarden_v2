import { Module } from '@nestjs/common';
import { SlideService } from './slide.service';
import { SlideController } from './slide.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SlideSchema } from './schema/slide-schema';
import { UsersModule } from '../users/users.module';
import { SlideShowModule } from '../slide-show/slide-show.module';
import { SlideshowSchema } from '../slide-show/schema/slideShow-schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Slide', schema: SlideSchema},{name: 'Slideshow',schema: SlideshowSchema}]),UsersModule,SlideShowModule],
  controllers: [SlideController],
  providers: [SlideService],
})
export class SlideModule {}
