import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decators/roles.decorator';
import { RolesGuard } from 'src/common/guard/roles.gaurd';
import { Role } from 'src/users/schema/users.schema';

import { oderDto } from './dto/oder-dto';
import { OrderService } from './oder.service';
import { Order } from './schema/oder.schema';


@Controller('order')
@UseGuards(RolesGuard)
export class OderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles([Role.Admin, Role.User, Role.Staff])
  async createOrder(@Body() createOrderDto: oderDto, @Req() request: any) {
    console.log(createOrderDto);
    const user = request.user;
    console.log(user);
    return this.orderService.createOrder(user, createOrderDto);
  }

  @Get()
  @Roles([Role.Admin, Role.User])
  async getAllProducts(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Patch(':orderId/status')
  @Roles([Role.Admin, Role.User, Role.Staff]) // Hoặc các role phù hợp
  async updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body('status') status: string,
  ) {
    return this.orderService.updateOrderStatus(orderId, status);
  }

  @Patch(':orderId/cancel')
  @Roles([Role.Admin, Role.User, Role.Staff]) // Hoặc các role phù hợp
  async cancelOrder(@Param('orderId') orderId: string) {
    return this.orderService.cancelOrder(orderId);
  }
}
