import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { User } from 'src/modules/users/schema/users.schema';

@Schema({
    timestamps: true
})
export class Review {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
customerId: Types.ObjectId;

@Prop()
star: number;

@Prop()
content: string;

@Prop()
username: string
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
