import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiscountcodeService } from './discountcode.service';
import { CreateDiscountcodeDto } from './dto/create-discountcode.dto';
import { UpdateDiscountcodeDto } from './dto/update-discountcode.dto';
import { Public } from 'src/common/decorators/public.decorations';

@Controller('discountcode')
export class DiscountcodeController {
    constructor(
        private readonly discountService: DiscountcodeService
    ) {}
    @Public()
  @Post()
  async create(@Body() createDiscountCodeDto: CreateDiscountcodeDto) {
    return this.discountService.create(createDiscountCodeDto)
  }
}
