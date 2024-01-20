import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './oder.service';
import { RolesGuard } from 'src/common/guard/roles.gaurd';
import { Role } from 'src/users/schema/users.schema';
import { Roles } from 'src/common/decorators/roles.decorator';
import { oderDto } from './dto/oder-dto';
import { Order } from './schema/oder.schema';

@Controller('order')
@UseGuards(RolesGuard)
export class OderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles([Role.Admin, Role.Admin, Role.Staff])
  async createOrder(createOrderDto: oderDto, @Req() request: any) {
    const user = request;
    console.log(user);
    return this.orderService.createOrder(user, createOrderDto);
  }

  @Get()
  @Roles([Role.Admin, Role.Staff])
  async getAllProducts(): Promise<Order[]> {
    return this.orderService.findAll();
  }
}
