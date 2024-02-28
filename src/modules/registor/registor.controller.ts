import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorations';

import { CreateRegistorDto } from './dto/create-registor.dto';
import { RegistorService } from './registor.service';

@ApiTags('Register')
@Public()
@Controller('register')
export class RegistorController {
  constructor(private readonly registorService: RegistorService) {}

  @Post()
  async registration(@Body() Registor: CreateRegistorDto) {
    console.log(`Registration of user '${Registor.username}' in progress.`);
    return await this.registorService.registerUser(Registor);
  }
}
