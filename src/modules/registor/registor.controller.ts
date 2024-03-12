import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorations';

import { CreateRegistorDto } from './dto/create-registor.dto';
import { RegistorService } from './registor.service';


@ApiTags('Register')

@Public()

@Controller('register')
export class RegistorController {
  constructor(private readonly registorService: RegistorService) {}
  @Post()
  @ApiOperation({ summary: 'đăng ký', description: 'Yêu cầu nhập đủ user và pass' })

  async registration(@Body() Registor: CreateRegistorDto) {
    console.log(`Registration of user '${Registor.username}' in progress.`);
    return await this.registorService.registerUser(Registor);
  }
}
