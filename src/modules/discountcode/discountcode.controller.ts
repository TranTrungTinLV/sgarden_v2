import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decators/roles.decorator';
import { RolesGuard } from 'src/common/guard/roles.gaurd';
import { Role } from 'src/modules/users/schema/users.schema';

import { DiscountcodeService } from './discountcode.service';
import { CreateDiscountcodeDto } from './dto/create-discountcode.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
// import { UpdateDiscountcodeDto } from './dto/update-discountcode.dto';
import { DiscountCode } from './schema/discountcode.schema';
import { UpdateDiscountcodeDto } from './dto/update-discountcode.dto';

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
    @ApiOperation({ summary: 'Tạo mã giảm giá mới', description: 'Yêu cầu role: Admin' })

    async create(@Body() createDiscountDto: CreateDiscountcodeDto): Promise<DiscountCode> {

        return this.discountService.create(createDiscountDto);
    }



  @Patch('updateDiscountCode/:id')
  @Roles([Role.Admin])
  @ApiOperation({summary: 'Update lại mã giảm giá', description: 'Yêu cầu role: Admin'})
  async update(@Param('id') id:string, @Body() createDiscountCodeDto: UpdateDiscountcodeDto) {
    return this.discountService.updateDiscountCode(id,createDiscountCodeDto)
  }
}
