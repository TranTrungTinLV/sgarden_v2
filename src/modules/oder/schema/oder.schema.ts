import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray } from 'class-validator';
import mongoose, { Document, Types } from 'mongoose';
import { DiscountCode } from 'src/modules/discountcode/schema/discountcode.schema';
import { Product } from 'src/modules/product/schema/product.schema';
import { User } from 'src/modules/users/schema/users.schema';


export enum OrderStatus {
  PENDING = 'pending',
  CONFIRM = 'confirm',
}

export enum Type {
  DELIVERY = 'delivery',
  INPLACE = 'inplace',
}

@Schema({
  timestamps: true,
})
export class Order extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  customer_id: User;


  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Product' })
  products: Product[] ;

  @Prop({type:mongoose.Schema.Types.Number, required: [true, 'Nhap di ba'] })
  total_price: number;

  @Prop({type:mongoose.Schema.Types.Number, required: [false, 'Nhap di ba'] })
  total_pay: number;

  @Prop({
    type: mongoose.Schema.Types.String,
    enum: Type,
    default: Type.DELIVERY,
  })
  type: Type;

  @Prop({
    type: mongoose.Schema.Types.String,
    required: false,
  })
  QRCode: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  payment_status: OrderStatus;


  //cancel
  @Prop({type: mongoose.Schema.Types.String})
  status: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'DiscountCode'})
  discountCode: DiscountCode | Types.ObjectId; //đây là discount
}

export const OderSchema = SchemaFactory.createForClass(Order);