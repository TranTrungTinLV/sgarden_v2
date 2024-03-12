import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Slideshow, SlideshowSchema } from './schema/slideShow-schema';
import { SlideShowController } from './slide-show.controller';
import { SlideShowService } from './slide-show.service';
import { SlideModule } from '../slide/slide.module';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Slideshow', schema: SlideshowSchema}])],
  controllers: [SlideShowController],
  providers: [SlideShowService],
})
export class SlideShowModule {}
