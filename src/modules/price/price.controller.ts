import { Body, Controller, Post } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceDto } from './dto/create-price.dto';
import { Price } from './schema/price.schema';
import { Public } from 'src/common/decorators/public.decorations';

@Controller('price')

export class PriceController {
  constructor(private readonly priceService: PriceService) {
  }
  @Public()
  @Post()
  async create(@Body() createPriceDto:PriceDto):Promise<Price>{
    return this.priceService.create(createPriceDto)
  }
}
