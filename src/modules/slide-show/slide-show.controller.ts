import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { SlideShowService } from './slide-show.service';
import { ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateSlideshowDto } from './dtos/slide-show.dto';
import { RolesGuard } from 'src/common/guard/roles.gaurd';
import { Roles } from 'src/common/decators/roles.decorator';
import { Role } from '../users/schema/users.schema';

@Controller('slide-show')
@ApiSecurity('bearerAuth')
@UseGuards(RolesGuard)
@ApiTags('Slideshows')
export class SlideShowController {
  constructor(private readonly slideShowService: SlideShowService) {}

  // @Post(':slideshowId/slides/:slideId')
  // addSlideToSlideShow(
  //   @Param('slideshowId') slideshowId: string,
  //   @Param('slideId') slideId: string
  // ) {
  //   return this.slideShowService.addSlideToSlideShow(slideshowId, slideId);
  // }

  @Roles([Role.Admin])
  @Post()
  createSlideShow(@Body() createSlideshowDto: CreateSlideshowDto) {
    return this.slideShowService.createOrUpdateSlideshow(createSlideshowDto);
  }

  @ApiConsumes('multipart/form-data')
  @Get('/list-by-visibility')
  @Roles([Role.Admin])
  
  async listByVisibility() {
    return this.slideShowService.getVisibleAndInvisibleSlideShows();
}


@Roles([Role.Admin])
@Get('/filter-by-visibility/:isShow')
async getSlideShowsByVisibility(@Query('isShow') isShow: string) {
    const isShowBoolean = isShow === 'true';
    const slideShows = await this.slideShowService.filterSlideShowsByVisibility(isShowBoolean);
    return slideShows;
}

// @Roles([Role.Admin])
// @Get('/isshow')
// async getSlide() {

//   return await this.slideShowService.getSlideShowsByVisibility()
// }
}
