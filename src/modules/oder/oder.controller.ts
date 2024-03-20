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
import { Role } from 'src/modules/users/schema/users.schema';

import { oderDto } from './dto/oder-dto';
import { OrderService } from './oder.service';
import { Order } from './schema/oder.schema';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from 'src/common/decorators/public.decorations';
import { AuthGuard } from '@nestjs/passport';
import { UpdateOrderStatusDto } from './dto/updateOder-dto';
import { OptionalAuthGuard } from 'src/common/guard/option-gaurd';

@ApiSecurity('bearerAuth')
@ApiTags('Order')
@Controller('order')
@UseGuards(RolesGuard) 
export class OderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  // @Roles([Role.User,Role.Admin])
  @UseGuards(OptionalAuthGuard)
  @Public()
  @ApiOperation({ summary: 'order món', description: 'Yêu cầu role: User, mã giảm giá discountcode có thì user nhập vào không có thì thôi không bắt buộc nhập ' })
  async createOrder(@Body() createOrderDto: oderDto, @Req() request: any) {
    console.log(createOrderDto);
    const user = request.user ? request.user : null; 
    if (request.user) {
      console.log(user)
    } else {
      console.log('Khach vãng lai')
    }
    // console.log(user);
    return this.orderService.createOrder(user, createOrderDto);
  }

  @Get()
  @Roles([Role.Admin, Role.Staff])
  @ApiOperation({ summary: 'lấy đơn hàng', description: 'Yêu cầu role: Admin or Staff' })
  async getAllOrder(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-order')
  @ApiOperation({summary: 'Lấy đơn hàng khi đang nhập'})
  async getUserLoginByid(@Req() request: any): Promise<Order[]> {
    const user = request.user;
    console.log(user)
    return this.orderService.findOrderBysUserId(user.id);
  }
  
  @Get('/history/:slug')
  @Public()
async getOrderHistoryBySlug(@Param('slug') slug: string): Promise<Order> {
  return this.orderService.findOrderBySlug(slug);
}

  @Get(':orderId')
  @Roles([Role.Admin])
  @ApiOperation({summary: 'Lấy đơn thông qua id',description: 'Yêu cầu role: Admin'})
  async getOrderById(@Param('orderId') orderId: string,): Promise<Order> {
    return this.orderService.findOrderById(orderId)
  }


  //Cập nhật trạng thái
  @Patch(':orderId/status')
  @Roles([Role.Admin, Role.Staff]) // Hoặc các role phù hợp
  @ApiOperation({ summary: 'cập nhật trạng thái đon hàng thông qua id', description: 'Yêu cầu role: Staff hoặc Admin' })
  async updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body('status') status: string,
  ) {
    return this.orderService.updateOrderStatus(orderId, status);
  }

  //hùy đơn hàng
  @Patch(':orderId/cancel')
  @Roles([Role.User, Role.Staff]) // Hoặc các role phù hợp
  @ApiOperation({ summary: 'huỷ đơn hàng', description: 'Yêu cầu role: Staff or User' })

  async cancelOrder(@Param('orderId') orderId: string) {
    return this.orderService.cancelOrder(orderId);
  }



  //xác nhận đơn hàng nè
  @Patch(':orderId/confirm')
  @Roles([Role.Staff,Role.Admin])
  @ApiOperation({ summary: 'xác nhận đơn hàng', description: 'Yêu cầu role: Staff va Admin' })
  confirmOrder(@Param('orderId') orderId: string,@Body() updateOrderStatus:UpdateOrderStatusDto) {
    return this.orderService.confirmOrderAndUpdatePoints(orderId,updateOrderStatus.status,updateOrderStatus.points);
  }

  //lấy số liệu thống kê theo ngày tháng năm
  @Get('revenue/statistics')
  @Roles([Role.Admin])
  @ApiOperation({ summary: 'lấy thống kê đơn hàng đã xác nhận', description: 'Yêu cầu role: Admin' })

  async getRevenueStatistics(){
    const today = new Date();
    const startDate = new Date(today.setHours(0,0,0,0));
    const endDate = new Date(today.setHours(23,59,59,999));
    return this.orderService.getStaticalOrder(startDate, endDate, 'day');
  }
}
