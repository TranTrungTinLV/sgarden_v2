import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schema/oder.schema';
import * as mongoose from 'mongoose';
// import { UpdateOrderDto, oderDto } from './dto/oder-dto';
// import { User } from 'src/auth/schema/auth.schema';

@Injectable()
export class OrderService {
  // constructor(
  //   @InjectModel(Order.name) private orderModel: mongoose.Model<Order>,
  // ) {}
  // async create(order: Order, user: User): Promise<Order> {
  //   const data = Object.assign(order);
  //   const createOder = await this.orderModel.create(data);
  //   return createOder;
  // }

  // async findOneByIdOrder(id: string): Promise<Order> {
  //   return this.orderModel.findOne({
  //     _id: id,
  //   });
  // }

  // async findAll(): Promise<Order[]> {
  //   const order = this.orderModel.find();
  //   return order;
  // }

  // async updateById(id: string, order: Order) {
  //   return await this.orderModel.findByIdAndUpdate(id, order, {
  //     new: true,
  //     runValidators: true,
  //   });
  // }

  // async UpdateOrderById(id: string, updateOrderDto: UpdateOrderDto) {
  //   return this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true });
  // }

  // async removeOrderByCustomerId(id: string): Promise<Order> {
  //   return await this.orderModel.findOneAndDelete({ _id: id });
  // }
}
