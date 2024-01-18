import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from 'src/users/schema/users.schema';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category_id: Types.ObjectId;

  @Prop({ type: [String], required: true })
  images?: string[];

  @Prop({ required: true })
  price_original: number;

  @Prop({ required: true })
  price_new: number;

  @Prop([Object])
  reviews: Record<string, any>[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: mongoose.Types.ObjectId;

  @Prop({ default: false, type: Boolean })
  isPublished: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
