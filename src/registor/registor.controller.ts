import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegistorService } from './registor.service';
import { CreateRegistorDto } from './dto/create-registor.dto';
// import { UpdateRegistorDto } from './dto/update-registor.dto';

@Controller('register')
export class RegistorController {
  constructor(private readonly registorService: RegistorService) {}

  @Post('do')
  async registration(@Body() Registor: CreateRegistorDto) {
    console.log(`Registration of user '${Registor.username}' in progress.`);
    return await this.registorService.registerUser(Registor);
  }
  // @Post()
  // create(@Body() createRegistorDto: CreateRegistorDto) {
  //   return this.registorService.create(createRegistorDto);
  // }

  // @Get()
  // findAll() {
  //   return this.registorService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.registorService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateRegistorDto: UpdateRegistorDto,
  // ) {
  //   return this.registorService.update(+id, updateRegistorDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.registorService.remove(+id);
  // }
}
