import { Body, Controller, Post } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceDto } from './dto/create-price.dto';
import { Price } from './schema/price.schema';
import { Public } from 'src/common/decorators/public.decorations';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('price')
@ApiTags('Price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {
  }
  @Public()
  @Post()
  @ApiOperation({summary: 'ko cần đến api này'})
  
  async create(@Body() createPriceDto:PriceDto):Promise<Price>{
    return this.priceService.create(createPriceDto)
  }
}
