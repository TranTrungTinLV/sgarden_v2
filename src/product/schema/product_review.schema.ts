import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Review {
  @Prop()
  star: number; // số sao đánh giá

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
  customerId: string;

  @Prop()
  content: string; // nội dung đánh giá
}
