import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { DiscountcodeService } from 'src/modules/discountcode/discountcode.service';
import { DiscountCode } from 'src/modules/discountcode/schema/discountcode.schema';
import { LevelMemberService } from 'src/modules/level-member/level-member.service';
import { Product } from 'src/modules/product/schema/product.schema';
import { UsersService } from 'src/modules/users/users.service';

// import { UpdateOrderDto, oderDto } from './dto/oder-dto';
import { User } from '../users/schema/users.schema';
import { oderDto } from './dto/oder-dto';
import { Order, OrderStatus } from './schema/oder.schema';
// import { PaymentService } from '../payment/payment.service';
import {  generateVietQRCode } from 'src/utils/generate_qRcode.ultils';
import { VietQR } from 'vietqr';

@Injectable()
export class OrderService {
  private vietQR: VietQR
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
    // private readonly paymentService: PaymentService,
  ) {
    this.vietQR = new VietQR({
      clientID: '904d1f14-eab6-4aa0-ae4d-bc11eeee7d08',
      apiKey: '9c28db2d-a43b-4d77-a362-0a01668d6c6c',
    });
  }

  async createOrder(user: User | null, createOrderDto: oderDto): Promise<Order> {
    let customer = null;
    let customer_id = null;
    if(user){
      customer = await this.userService.findOne(user.username);
      if (!customer) {
        throw new NotFoundException(`Customer not found`);
      }
      customer_id = customer._id;
    }
  if (!createOrderDto || !Array.isArray(createOrderDto.products) || createOrderDto.products.length === 0) {
    throw new NotFoundException('Order data is missing or products is not iterable');
  }
  const { products } = createOrderDto;

  let total = 0;
  let f_Size;
  for (const { productId, size, quantity } of products) {
    const product = await this.productModel.findById(productId);    
    if (!product) {
      throw new NotFoundException(`Product ${productId} not found`);
    }

    let finalPrice = product.price_new;
    // const priceSize = product.prices.find(price => price.size === size);


    if (size) {
      const priceSize = product.prices.find(price => price.size === size);
      if (priceSize) {
        finalPrice = priceSize.new_price; // Nếu có kích thước, cập nhật giá dựa trên kích thước
        console.log(finalPrice);
        f_Size = priceSize.size
        
      }
      if (!priceSize) {
        throw new NotFoundException(`Size ${size} not found for product ${productId}`);
      }
    }

    total += finalPrice * quantity;
      // Giả định rằng bạn cập nhật số lượng tồn kho ở đây hoặc trong một bước sau
    }
  
    // Xác thực mã giảm giá nếu có và áp dụng giảm giá
    let discountPercent = 0;
    if (createOrderDto.discountCode) {
      const discountCode = await this.disCountCodeService.validateDiscountCode(createOrderDto.discountCode);
      if (discountCode) {
        discountPercent = discountCode.discount;
      }
    }
  
    const discountedTotal = total * (1 - discountPercent / 100);
  
    // Tạo đơn hàng mới với tổng giá đã được tính toán
    const order = new this.orderModel({
      customer_id: customer_id,
      items: createOrderDto.products.map(p => ({
        product: p.productId,
        quantity: p.quantity,
        size: f_Size
      })),
      total_price: discountedTotal,
      status: OrderStatus.PENDING,
      // Các trường khác...
    });
    console.log(order)

    const accountInfo = {
  "accountNo": "39024517",
  "accountName": "TRAN TRUNG TIN",
  "acqId": 970416,
  "amount": total,
  "addInfo": "SGOD",
  "format": "text",
  "template": "qr_only"
};
 


  const qrCode = await generateVietQRCode(JSON.stringify(accountInfo));
    console.log('qrCode',qrCode)
    order.QRCode = qrCode;
    // order.size = 
    // Lưu đơn hàng và trả về
    await order.save();
    // this.paymentService.createPayment(total)
    return await order.populate({
      path: 'items.product', 
      select: 'name images prices',
     
    });
  }

  //find by order to slug
  async findOrderBySlug(slug: string): Promise<Order> {
    const order = await this.orderModel.findOne({ slug: slug }).exec();
    if (!order) {
      throw new NotFoundException(`Order with slug ${slug} not found.`);
    }
    return order;
  }


  async findAll(): Promise<Order[]> {
    const order = await this.orderModel
    .find()
    .populate({
      path: 'customer_id',
      select: 'username',
      populate: {
        path: 'level_member',
        select: 'level_name'
      }
    }).populate({
      path: 'items.product',
      select: 'name images',  
    }).populate({
      path: 'items',
      select: 'size'
    }).sort(
      {
        createdAt: -1
      }
    )
    .exec();
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
      path: 'items.product',
      select: 'name images',
     
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
    order.status = 'CANCELED'; //cancelled
    return order.save();
  }

  //find user by id
  async findOrderBysUserId(userId:string): Promise<Order[]>{
    const orderUser = await this.orderModel.find({ customer_id: userId }).populate('customer_id','username').populate('products','name').exec();
    // const result
    return orderUser
  }
  // Confirm sản phẩm khi users đặt hàng
  async confirmOrderAndUpdatePoints(orderId: string, newStatus: string, pointsToAdd: number): Promise<Order> {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
  
    order.status = newStatus;
    await order.save();
  
    if (newStatus === 'CONFIRMED') { // Sử dụng giá trị thực tế cho trạng thái xác nhận
      await this.userService.addPoints(order.customer_id._id, pointsToAdd);
    }
  
    return order;
  }
  
  // statical
   //statical order
   async getStaticalOrder(startDate: Date, endDate: Date, filterType: string): Promise<any> {
    return await this.orderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          status: 'CONFIRMED' 
        }
      },
      {
        $addFields: {
          isGuestOrder: {
            $cond: { if: { $eq: ["$customer_id", null] }, then: 'Khách vãng lai', else: "khách đã đăng nhập" }
          }
        }
      },
      {
        $group: {
          _id: {
            date: {
              $dateTrunc: {
                date: "$createdAt",
                unit: filterType
              }
            },
            isGuestOrder: "$isGuestOrder"
          },
          count: { $sum: 1 },
          totalRevenue: { $sum: "$total_price" }
        }
      }
    ]).exec();
  }
  
  
  


  }

