import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decators/roles.decorator';
import { RolesGuard } from 'src/common/guard/roles.gaurd';
import { Role } from 'src/modules/users/schema/users.schema';
import { multerOptions } from 'src/utils/uploadImage';

import { FooterDto } from './dtos/create-footer.dto';
import { FooterService } from './footer.service';
import { Footer } from './schema/footer.schema';


@ApiTags('Footer')
@ApiSecurity('bearerAuth')
@UseGuards(RolesGuard)
@Controller('footer')
export class HeaderController {
  constructor(private readonly footerService: FooterService) {}

  @Roles([Role.Admin])
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        logo: {
          type: 'string',
          format: 'binary',
        },
        phone: {type: 'string'},
        address: {type: 'string'}
      }
    }
  })
  @UseInterceptors(FileInterceptor('logo',multerOptions('logosHeader')))
  async create(@Body() createFooterDto: FooterDto,@UploadedFile() file: Express.Multer.File):Promise<Footer> {
    if(file){
      createFooterDto.logo = `images/logosHeader/${file.filename}`
      console.log(file)
      console.log("ok")
    }
    return this.footerService.createFooter(createFooterDto)
  }
}
