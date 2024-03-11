import { Controller } from '@nestjs/common';
import { SlideShowService } from './slide-show.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('slide-show')
@ApiTags('Slideshows')
export class SlideShowController {
  constructor(private readonly slideShowService: SlideShowService) {}
}
