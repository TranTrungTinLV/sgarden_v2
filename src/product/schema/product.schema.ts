import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from 'src/users/schema/users.schema';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category_id: Types.ObjectId;

  @Prop([String])
  images?: string[];

  @Prop()
  price_original: number;

  @Prop()
  @Prop()
  price_new: number;

  @Prop([Object])
  reviews: Record<string, any>[];

  @Prop({ type: User, ref: 'User' })
  owner: User; //admin & staff

  @Prop({ default: false, type: Boolean })
  isPublished: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
