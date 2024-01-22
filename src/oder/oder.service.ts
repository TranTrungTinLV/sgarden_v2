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

    // Validate products and check stock
    let total = 0;
    for (const productId of products) {
      const productItem = await this.productModel.findById(productId);
      if (!productItem) {
        throw new NotFoundException(`Product ${productId} not found`);
      }
      if (productItem.quantityInStock <= productItem.quantity) {
        throw new NotFoundException(`Product ${productId} is out of stock`);
      }
      total += productItem.price_new;
      productItem.quantityInStock -= 1; // Giảm số lượng tồn kho
      await productItem.save();
    }

    // Create order
    const order = new this.orderModel({
      customer: user._id,
      products: products,
      total_price: total,
      status: OrderStatus.PENDING,
    });

    // // Kiểm tra số lượng tồn kho
    // for (const productId of createOrderDto.products) {
    //   const products = await this.productModel.findById(productId);
    //   if (!product || products.quantityInStock <= createOrderDto.quantity) {
    //     throw new NotFoundException(`Product ${productId} is out of stock`);
    //   }
    //   // Giảm số lượng tồn kho
    //   products.quantityInStock -= 1;
    //   await product;
    // }

    return order.save();
  }

  async findAll(): Promise<Order[]> {
    const order = this.orderModel.find();
    return order;
  }

  async updateOrderStatus(orderId: string, newStatus: string): Promise<Order> {
    const order = await this.orderModel.findById(orderId);
    console.log(orderId, 'orderId');
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.status = newStatus;
    return order.save();
  }

  async cancelOrder(orderId: string): Promise<Order> {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.status = 'cancelled';
    return order.save();
  }
}
