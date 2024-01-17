import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { User } from '../../users/schema/users.schema';
import { v4 } from 'uuid';

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  // Relationship: Many-to-Many with Product
  @Prop([{ type: Types.ObjectId, ref: 'Product' }])
  products: Types.ObjectId[];
}

export const OderSchema = SchemaFactory.createForClass(Order);
