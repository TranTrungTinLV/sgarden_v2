import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decators/roles.decorator';
import { RolesGuard } from 'src/common/guard/roles.gaurd';
import { Role } from 'src/modules/users/schema/users.schema';

import { DiscountcodeService } from './discountcode.service';
import { CreateDiscountcodeDto } from './dto/create-discountcode.dto';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiSecurity('bearerAuth')
@ApiTags('DiscountCode')
@Controller('discountcode')
@UseGuards(RolesGuard)
export class DiscountcodeController {
    constructor(
        private readonly discountService: DiscountcodeService
    ) {}

  @Post()
  @Roles([Role.Admin])
  @ApiOperation({ summary: 'Tạo danh mục', description: 'Yêu cầu role: Admin' })

  async create(@Body() createDiscountCodeDto: CreateDiscountcodeDto) {
    return this.discountService.create(createDiscountCodeDto)
  }
}
