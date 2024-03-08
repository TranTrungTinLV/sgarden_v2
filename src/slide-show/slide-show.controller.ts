import { Controller } from '@nestjs/common';
import { SlideShowService } from './slide-show.service';

@Controller('slide-show')
export class SlideShowController {
  constructor(private readonly slideShowService: SlideShowService) {}
}
