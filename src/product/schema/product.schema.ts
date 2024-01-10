import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category_id: Types.ObjectId;

  @Prop([String])
  images?: object[];

  @Prop()
  price_original: number;

  @Prop()
  price_new: number;

  @Prop([Object])
  reviews: Record<string, any>[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
