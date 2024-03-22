import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FooterService } from './header.service';
import { Footer } from './schema/footer.schema';
import { FooterDto } from './dtos/create-footer.dto';
import { Roles } from 'src/common/decators/roles.decorator';
import { Role } from 'src/modules/users/schema/users.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/utils/uploadImage';
import { RolesGuard } from 'src/common/guard/roles.gaurd';



@UseGuards(RolesGuard)
@Controller('footer')
export class HeaderController {
  constructor(private readonly footerService: FooterService) {}

  @Roles([Role.Admin])
  @Post()
  @UseInterceptors(FileInterceptor('logo',multerOptions('logosHeader')))
  async create(@Body() createHeaderDto: FooterDto,@UploadedFile() file: Express.Multer.File):Promise<Footer> {
    if(file){
      createHeaderDto.logo = `images/logosHeader/${file.filename}`
      console.log(file)
      console.log("ok")
    }
    return this.footerService.createFooter(createHeaderDto)
  }
}
