import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { DiscountcodeService } from 'src/discountcode/discountcode.service';
import { DiscountCode } from 'src/discountcode/schema/discountcode.schema';
import { LevelMemberService } from 'src/level-member/level-member.service';
import { Product } from 'src/product/schema/product.schema';
import { UsersService } from 'src/users/users.service';
import { generateQRCode } from 'src/utils/generate_qRcode.ultils';

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
    @InjectModel(DiscountCode.name)
    private readonly disCountModel: mongoose.Model<DiscountCode>,
    private readonly userService: UsersService,
    private disCountCodeService: DiscountcodeService,
    private readonly levelService: LevelMemberService,
  ) {}

  async createOrder(user: User, createOrderDto: oderDto): Promise<Order> {
    const custormer = await this.userService.findOne(user.username)
    if (!createOrderDto || !createOrderDto.products) {
      throw new NotFoundException('Order data is missing');
    }
    const { products } = createOrderDto;

    // Validate products and check stock
    let total = 0;
    // let discountCodeDocument: DiscountCode | null = null;

    for (const productId of products) {
      const productItem = await this.productModel.findById(productId);
      if (!productItem) {
        throw new NotFoundException(`Product ${productId} not found`);
      }
      // if (productItem.quantityInStock < 1) {
      //   throw new NotFoundException(`Product ${productId} is out of stock`);
      // }
      total += productItem.price_new;
      productItem.quantityInStock -= 1; // Giảm số lượng tồn kho
      await productItem.save();
    }

    //Xác thực mã giảm giá nếu có
    let discountPercent = 0;
    if(createOrderDto.discountCode){
      const discountCode = await this.disCountCodeService.validateDiscountCode(createOrderDto.discountCode);
      console.log(discountCode,"%")
      if(discountCode){
        console.log("tồn tại mã")
        discountPercent = discountCode.discount
      }
    }

    const discountedTotal = total * (1 - discountPercent / 100);
    console.log("Áp dụng giảm giá",discountedTotal)
    // Create order
    const order = new this.orderModel({
      customer_id: custormer._id,
      products: products,
      total_price: discountedTotal,
      status: OrderStatus.PENDING,
    });

    const qrData = {total_price: total, custormer: user.username}

    const qrCode = await generateQRCode(JSON.stringify(qrData));

    order.QRCode = qrCode;

    console.log(user?.username)
    

    //Lưu đơn hàng cái
    const savedOrder = await order.save();
    await this.userService.updateScoreAndLevel(user.username,1); // Tăng điểm lên 1 sau mỗi đơn hàng

    // await this.updateUserOrderScore(user._id)

    //Cập nhật là mã trạng thái đã sử dụng
    if(createOrderDto.discountCode) {
      await this.disCountModel.updateOne({code: createOrderDto.discountCode},{isUsed: true}).exec();
    }

    //Cập nhật điểm và cấp độ thành viên
    // await this.userService.updateScoreAndLevel(user._id)
    await savedOrder;
    console.log('ko populated',savedOrder)
    console.log('Before populate:', order);
    const populateOrder = await this.orderModel.findById(order._id).populate('products','name').exec()
    console.log('populate',populateOrder)
    console.log('Populated order:', populateOrder);
    return populateOrder;
  }

  async findAll(): Promise<Order[]> {
    const order = await this.orderModel
    .find()
    .populate({
      path: 'customer_id',
      select: 'username'
    }).populate({
      path: 'products',

    }).exec();
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

  async findOrderById(orderId: string): Promise<Order> {
    const order = await this.orderModel.findById(orderId)
    .populate('customer_id','username email ').populate(
     {
      path: 'products',
      select: 'name price_original price_new categoryName',
     
    }
    
      )// Populate thông tin khách hàng;
      .exec()
    console.log(order)
    console.log(orderId, 'orderId');
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    return order;
  }

  async cancelOrder(orderId: string): Promise<Order> {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.status = 'cancelled';
    return order.save();
  }


  //Confirm sản phẩm khi users đặt hàng
  async confirmOrder(orderId:string): Promise<Order>  {
    const order = await this.orderModel.findById(orderId);
    console.log(order)
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.status = 'confirm';
    return order.save();
  }

  // private async updateUserOrderScore(userSlug: string) {
  //   const user = await this.userModel.findOne({
  //     username: userSlug
  //   });
  //   console.log(user)
  //   if(!user) {
  //     throw new NotFoundException(`User with ID ${userSlug} không tôn tại nên không thể cập nhật điểm`);
  //   }

  //   //Tăng số lần đặt hàng và kiểm tra điều kiện tích điểm
  //   user.score = (user.score || 0) + 1;
  //   const newLevel = await this.levelService.determineMemberLevel(user.score);
  //   console.log(newLevel)
  //   user.level_member = newLevel._id
  //   // console.log(score)
  //   // const newLevel = await this.levelService.determineMemberLevel(score)
  //   // user.level_member = newLevel._id
  //   // if(user.score >= 5) {
  //   //   //Tích điểm và reset số lần đặt hàng
  //   //   // await this.userService.updateMemberPoints(userSlug,1);
  //   //   user.score = 0;
  //   //   console.log("tăng điểm")
  //   // }
  //   await user.save();
  // }
  }



