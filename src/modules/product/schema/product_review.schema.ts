import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/modules/users/schema/users.schema';

@Schema({
    timestamps: true
})
export class Review {
  @Prop()
  star: number; // số sao đánh giá

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  customerId: User;

  @Prop()
  content: string; // nội dung đánh giá
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
