import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FooterService } from './footer.service';
import { Footer } from './schema/footer.schema';
import { FooterDto } from './dtos/create-footer.dto';
import { Roles } from 'src/common/decators/roles.decorator';
import { Role } from 'src/modules/users/schema/users.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/utils/uploadImage';
import { RolesGuard } from 'src/common/guard/roles.gaurd';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';


@ApiTags('Information')
@UseGuards(RolesGuard)
@ApiSecurity('bearerAuth')
@Controller('footer')
export class FooterController {
  constructor(private readonly footerService: FooterService) {}

  @Roles([Role.Admin])
  @Post()
  @UseInterceptors(FileInterceptor('logo',multerOptions('logosFooter')))
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
        address: {type: 'string'},
        maps: {type: 'string'}

      }
    }
  })
  async create(@Body() createFooterDto: FooterDto,@UploadedFile() file: Express.Multer.File):Promise<Footer> {
    if(file){
      createFooterDto.logo = `images/logosFooter/${file.filename}`
      console.log(file)
      console.log("ok")
    }
    return this.footerService.createFooter(createFooterDto)
  }
}
