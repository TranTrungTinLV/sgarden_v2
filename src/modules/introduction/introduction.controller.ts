import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { IntroductionService } from './introduction.service';
import { Introduction } from './schema/introduction.shcema';
import { IntroductionDto } from './dto/create-introdution';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { multerOptions } from 'src/utils/uploadImage';
import {FileInterceptor} from '@nestjs/platform-express'
import { Response } from 'express';
import { join } from 'path';
import { Public } from 'src/common/decorators/public.decorations';
@ApiSecurity('bearerAuth')
@ApiTags('Introduction')
@Controller('introduction')
export class IntroductionController {
  constructor(private introductionService: IntroductionService) {}


  @Get()
  async getAll(): Promise<Introduction[]> {
    return this.introductionService.findAll();
  }
  // @Get(':id')
  // async getTaskId(@Param('id') id: string): Promise<Introduction> {
  //   return this.introductionService.findbyId(id);
  // }
  
  //http://localhost:3001/introduction/images/introductions/2be3b29c-16a8-48d5-9189-493eee790406.jpg
  @Public()
  @Get('images/introductions/:file')
  async getPicture(@Param('file') file, @Res() res: Response) {
    if(!file){
      res.statusMessage
    }
    const imagePath = join(process.cwd(), 'images/introductions', file);
    console.log('imagePath', imagePath)
    res.sendFile(imagePath);
  }
  @Post('')
  @UseInterceptors(FileInterceptor('image',multerOptions('introductions')))
  async createIntroduction(
    @UploadedFile() file: Express.Multer.File,
    @Body() introductionDto: IntroductionDto,
  ): Promise<Introduction> {
    if(file){
      introductionDto.image = `/images/introductions/${file.filename}`
      console.log(file)
      console.log("ok")
    }
    return this.introductionService.create(introductionDto);
  }
}
