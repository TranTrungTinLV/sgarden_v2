import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from '../../users/schema/users.schema';

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
  @Prop({ type: Types.ObjectId, ref: 'User' })
  customer_id: User;

  @Prop([{ type: Types.ObjectId, ref: 'Product' }])
  products: Types.ObjectId[];

  @Prop({ required: [false, 'Nhap di ba'] })
  total_price: number;

  @Prop({ required: [false, 'Nhap di ba'] })
  total_pay: number;

  @Prop({
    type: String,
    enum: Type,
    default: Type.DELIVERY,
  })
  type: Type;

  // @Prop()
  // QRCode: string;

  @Prop({
    type: String,
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  payment_status: OrderStatus;

  @Prop()
  images?: object[];
}

export const OderSchema = SchemaFactory.createForClass(Order);
