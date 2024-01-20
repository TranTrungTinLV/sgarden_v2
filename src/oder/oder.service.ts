import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from 'src/product/schema/product.schema';

// import { UpdateOrderDto, oderDto } from './dto/oder-dto';
import { User } from '../users/schema/users.schema';
import { oderDto } from './dto/oder-dto';
import { Order, OrderStatus } from './schema/oder.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: mongoose.Model<Order>,
    @InjectModel(User.name) private readonly userModel: mongoose.Model<User>,
    @InjectModel(Product.name)
    private readonly productModel: mongoose.Model<Product>,
  ) {}

  async createOrder(user: User, createOrderDto: oderDto): Promise<Order> {
    if (!createOrderDto || !createOrderDto.products) {
      throw new NotFoundException('Order data is missing');
    }
    const { products } = createOrderDto;

    // Validate products
    const product = await this.productModel.find({ _id: { $in: products } });
    if (product.length !== products.length) {
      throw new NotFoundException('One or more products not found');
    }

    // Calculate total price
    const total = product.reduce((sum, product) => sum + product.price_new, 0);

    // Create order
    const order = new this.orderModel({
      customer: user._id,
      products: product.map((product) => product._id),
      total,
      status: OrderStatus.PENDING,
    });

    return order.save();
  }

  async findAll(): Promise<Order[]> {
    const order = this.orderModel.find();
    return order;
  }
}
