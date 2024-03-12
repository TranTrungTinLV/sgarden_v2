import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { join } from 'path';
import { Roles } from 'src/common/decators/roles.decorator';
import { Public } from 'src/common/decorators/public.decorations';
import { multerOptions } from 'src/utils/uploadImage';

import { Role } from '../users/schema/users.schema';
import { IntroductionDto } from './dto/create-introdution';
import { IntroductionService } from './introduction.service';
import { Introduction } from './schema/introduction.shcema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
@ApiSecurity('bearerAuth')
@ApiTags('Introduction')
@Controller('introduction')
export class IntroductionController {
  constructor(
    private introductionService: IntroductionService,
    private cloudinaryService: CloudinaryService
    ) {}

  @Get()
  @Public()
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
  @Roles([Role.Admin])
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {type: 'string'},
        content: {type: 'string'},
        image: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('image',multerOptions('introductions')))
  async createIntroduction(
    @UploadedFile() file: Express.Multer.File,
    @Body() introductionDto: IntroductionDto,
  ): Promise<Introduction> {
    if(file){

      introductionDto.image = `images/introductions/${file.filename}`
      console.log(file)
      console.log("ok")

      // Upload lên Cloudinary và lấy URL
    // const cloudinaryResult = await this.cloudinaryService.uploadFile(file);
    // const cloudinaryUrl = cloudinaryResult.url;

    
    
    // // Lưu trữ local
    // const localPath = `images/introductions/${file.filename}`;

    // // Lưu trữ cả hai đường dẫn trong một trường dưới dạng JSON
    // introductionDto.image = JSON.stringify({
    //   cloudinary: cloudinaryUrl,
    //   local: localPath,
    // });
      
    }
    return this.introductionService.createOrUpdate(introductionDto);
  }
}
