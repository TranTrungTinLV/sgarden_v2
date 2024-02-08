import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { LevelMember, MemberLevel } from 'src/level-member/schema/levelMember.schema';
import { Order, Type } from 'src/oder/schema/oder.schema';
import { Product } from 'src/product/schema/product.schema';
import { v4 } from 'uuid';

export enum Role {
  User = 'customer',
  Admin = 'admin',
  Staff = 'staff',
}

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({
    required: [true, 'Please enter userName'],
    unique: [true, "duy nhất 1 username"]
  })
  
  username: string;

  @Prop(
    {
      default: () => v4().split('-')[0]
    }
  )
  slug: string;
  @Prop({
    required: [true, 'Please enter password'],
  })
  password: string;
  @Prop({
    unique: [true, 'it exists'],
  })
  email: string;
  @Prop({
    required: [true, 'Please enter sex'],
  })
  sex: string;
  @Prop({
    required: [true, 'Please enter birthday'],
  })
  birthday: string;
  @Prop({
    required: [true, 'Please enter numberPhone'],
  })
  phone: string;
  @Prop({ type: Types.ObjectId, ref: 'LevelMember' })
  
  level_member: MemberLevel;

  @Prop({
    required: [true, 'Please enter fullName'],
  })
  fullname: string;

  @Prop({
    type: String,
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @Prop({
    type: String,
    default:
      'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-541.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1702512000&semt=ais',
  })
  avatar: string;

  //One to Many
  @Prop({ type: Types.ObjectId, ref: 'Product' })
  product: Product[];

  //One to Many Order
  @Prop({ type: Types.ObjectId, ref: 'Order' })
  orders: Order[];

  @Prop({type: [{type: String}]})
  feedbacks: string[];

  @Prop({default: 0})
  score: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
