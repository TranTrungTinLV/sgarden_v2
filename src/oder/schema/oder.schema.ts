import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/auth.schema';
import { v4 } from 'uuid';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRM = 'confirm',
}

export enum Types {
  DELIVERY = 'delivery',
  INPLACE = 'inplace',
}

@Schema({
  timestamps: true,
})
export class Order {
  @Prop({
    type: String,
    default: function UUID() {
      return v4().split('-')[0];
    },
  })
  customer_id: string;
  // @Prop([
  //   {
  //     product_id: String,
  //     quantity: Number,
  //     size: String,
  //   },
  // ])
  // products: Record<string, any>[];
  @Prop({ required: [true, 'Nhap di ba'] })
  total_price: string;
  @Prop({
    type: String,
    enum: Types,
    default: Types.DELIVERY,
  })
  type: Types;
  // @Prop()
  // QRCode: string;
  @Prop({
    type: String,
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  payment_status: OrderStatus;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const OderSchema = SchemaFactory.createForClass(Order);
