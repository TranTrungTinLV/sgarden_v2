import {
  Body,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorations';

import { CreateRegistorDto } from './dto/create-registor.dto';
import { RegistorService } from './registor.service';
import { rateLimitMiddleware } from 'src/utils/rating-limit';


@ApiTags('Register')

@Public()
@Controller('register')
export class RegistorController {
  constructor(private readonly registorService: RegistorService) {}

  // @UseInterceptors(rateLimitMiddleware)
  @Post()
  @ApiOperation({ summary: 'đăng ký', description: 'Yêu cầu nhập đủ user và pass' })
  async registration(@Body() Registor: CreateRegistorDto) {
    console.log(`Registration of user '${Registor.username}' in progress.`);
    return await this.registorService.registerUser(Registor);
  }
}
