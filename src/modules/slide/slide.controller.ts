import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decators/roles.decorator';
import { RolesGuard } from 'src/common/guard/roles.gaurd';
import { multerOptions } from 'src/utils/uploadImage';

import { Role } from '../users/schema/users.schema';
import { CreateSlideDto } from './dtos/slide-dto';
import { Slide } from './schema/slide-schema';
import { SlideService } from './slide.service';

@ApiSecurity('bearerAuth')
@ApiTags('Slide')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('slide')
export class SlideController {
  constructor(private readonly slideService: SlideService) {}

  @Roles([Role.Admin])
  @UseInterceptors(FileInterceptor('image',multerOptions('slide')))
  @Post()
  create(@Body() createSlideDto: CreateSlideDto,@UploadedFile() file: Express.Multer.File): Promise<Slide>{
    if(file){
      createSlideDto.image = `/images/slide/${file.filename}`
    }
    return this.slideService.createSlide(createSlideDto)
  }

  // @Roles([Role.Admin])
  // @Get()
  // getAll():Promise<Slide[]> {
  //   return this.slideService.getAllSlide()
  // }

  // @Roles([Role.Admin])
  // @UseInterceptors(FileInterceptor('image',multerOptions('slide')))
  // @Put(':id')
  // updateSlide(@Param('id') id: string,@Body() slideUpdateDto: CreateSlideDto, @UploadedFile() file: Express.Multer.File): Promise<Slide>{
  //   if(file){
  //     slideUpdateDto.image = `/images/slide/${file.filename}`
  //   }
  //   return this.slideService.updateSlide(id,slideUpdateDto)
  // }
  
  // @Roles([Role.Admin])
  // @UseInterceptors(FileInterceptor('image',multerOptions('slide')))
  // @Delete(':id')
  // deleteSlide(@Param('id') id:string){
  //   return this.slideService.deleteSlide(id)
  // }
}
