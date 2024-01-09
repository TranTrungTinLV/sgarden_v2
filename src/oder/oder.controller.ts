import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './oder.service';
import { Order } from './schema/oder.schema';
import { AuthGuard } from '@nestjs/passport';
import { oderDto } from './dto/oder-dto';

import { ApiTags } from '@nestjs/swagger';
import { updateOderDto } from './dto/updateOder-dto';
// import { Query as ExpressQuery } from 'express-serve-static-core';
@ApiTags('Order')
@Controller('order')
@UseGuards(AuthGuard())
export class OderController {
  constructor(private orderService: OrderService) {}
  @Post()
  async createOrder(@Body() order: oderDto, @Req() req): Promise<Order> {
    return this.orderService.create(order, req.user);
  }
  @Get()
  async getAllOder(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Put(':id')
  async updateOrder(
    @Param('id')
    id: string,
    @Body()
    orderUpdate: updateOderDto,
  ): Promise<Order> {
    return this.orderService.updateById(id, orderUpdate);
  }
  @Delete(':id')
  async deleteOrder(
    @Param('id')
    id: string,
  ): Promise<Order> {
    return this.orderService.removeOrderByCustomerId(id);
  }
}
