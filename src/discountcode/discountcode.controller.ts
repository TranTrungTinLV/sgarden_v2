import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiscountcodeService } from './discountcode.service';
import { CreateDiscountcodeDto } from './dto/create-discountcode.dto';
import { UpdateDiscountcodeDto } from './dto/update-discountcode.dto';

@Controller('discountcode')
export class DiscountcodeController {
  constructor(private readonly discountcodeService: DiscountcodeService) {}

  @Post()
  create(@Body() createDiscountcodeDto: CreateDiscountcodeDto) {
    return this.discountcodeService.create(createDiscountcodeDto);
  }

  @Get()
  findAll() {
    return this.discountcodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountcodeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscountcodeDto: UpdateDiscountcodeDto) {
    return this.discountcodeService.update(+id, updateDiscountcodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountcodeService.remove(+id);
  }
}
