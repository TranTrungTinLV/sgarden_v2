import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Category } from 'src/modules/category/schema/category.schema';
import { Order } from 'src/modules/oder/schema/oder.schema';
// import { User } from 'src/users/schema/users.schema';

@Schema({
  timestamps: true
})
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  //Many to One
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category_id: Types.ObjectId;


  @Prop({ type: [String], required: true })
  images?: string[];
  
  @Prop({ type: Types.ObjectId, ref: 'Order' })
  order: Order[];

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  price_original: number;

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  price_new: number;

  @Prop({type: [mongoose.Schema.Types.ObjectId],ref:'Review'})
  reviews: Types.ObjectId[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: mongoose.Types.ObjectId;

  @Prop({ default: false, type: Boolean })
  isPublished: boolean;

  //quản lý số lượng sản phẩm tồn kho.
  @Prop({ required: true, default: 0 })
  quantityInStock: number;

  @Prop({ required: true })
  quantity?: number;

  @Prop()
  category: string

  
};



export const ProductSchema = SchemaFactory.createForClass(Product);
