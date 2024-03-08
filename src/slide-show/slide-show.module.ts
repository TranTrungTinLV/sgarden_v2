import { Module } from '@nestjs/common';
import { SlideShowService } from './slide-show.service';
import { SlideShowController } from './slide-show.controller';

@Module({
  controllers: [SlideShowController],
  providers: [SlideShowService],
})
export class SlideShowModule {}
