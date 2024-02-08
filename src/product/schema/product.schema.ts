import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Category } from 'src/category/schema/category.schema';
import { Order } from 'src/oder/schema/oder.schema';
// import { User } from 'src/users/schema/users.schema';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  //Many to One
  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category_id: Types.ObjectId;


  @Prop({ type: [String], required: true })
  images?: string[];

  @Prop({ type: Types.ObjectId, ref: 'Order' })
  order: Order[];

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

  //quản lý số lượng sản phẩm tồn kho.
  @Prop({ required: true, default: 0 })
  quantityInStock: number;

  @Prop({ required: true })
  quantity?: number;

  
};



export const ProductSchema = SchemaFactory.createForClass(Product);
