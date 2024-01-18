import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RegistorService } from './registor.service';
import { CreateRegistorDto } from './dto/create-registor.dto';
import { Public } from 'src/decorators/public.decorations';
// import { UpdateRegistorDto } from './dto/update-registor.dto';

// @UseGuards)

@Public()
@Controller('register')
export class RegistorController {
  constructor(private readonly registorService: RegistorService) {}

  @Post('do')
  async registration(@Body() Registor: CreateRegistorDto) {
    console.log(`Registration of user '${Registor.username}' in progress.`);
    return await this.registorService.registerUser(Registor);
  }
}
