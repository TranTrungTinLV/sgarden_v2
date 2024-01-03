import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { Repository } from 'typeorm';
import { CreateOderDto } from './dtos/create-order-dto';
import { Order } from './oder.entity';
import { OrderStatus, Types } from './order.model';
import { v4 } from 'uuid';
import { User } from 'src/users/users.entity';
@Injectable()
export class OderService {
  constructor(
    @InjectRepository(Order) private readonly repo: Repository<Order>,
  ) {}
  generateId(): string {
    return v4().split('-')[0];
  }
  create(createOrderDto: CreateOderDto, user: User) {
    const order = new Order();
    order.customer_id = this.generateId();
    // order.products = createOrderDto.products.map((p) => ({
    //   product_id: p.product_id,
    //   quantity: p.quantity,
    //   size: p.size,
    // }));
    order.total_price = createOrderDto.total_price;
    order.discount_code = createOrderDto.discount_code;
    order.total_pay = createOrderDto.total_pay;
    order.type = Types.INPLACE;
    order.approved = createOrderDto.approved ?? false;
    order.user = user;
    order.QRCode = createOrderDto.QRCode;
    order.payment_status = OrderStatus.PENDING;
    // Nếu có thêm trường khác, hãy thêm chúng ở đây

    // // Lưu Order vào cơ sở dữ liệu
    return this.repo.save(order);

    // const report = this.repo.create(createOrderDto);
    // report.user = user;
    // return this.repo.save(report);
  }
  async changeAproval(customer_id: string, approved: boolean) {
    const report = await this.repo.findOne({ where: { customer_id } });
    if (!report) {
      throw new NotFoundException('report not found');
    }
    report.approved = approved;
    return this.repo.save(report);
  }
}
