import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { LevelMember, MemberLevel } from 'src/modules/level-member/schema/levelMember.schema';
import { Order, Type } from 'src/modules/oder/schema/oder.schema';
import { Product } from 'src/modules/product/schema/product.schema';
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
    type: mongoose.Schema.Types.String,
    required: [true, 'Please enter userName'],
    unique: [true, "duy nhất 1 username"]
  })
  
  username: string;

  @Prop(
    {
      type: mongoose.Schema.Types.String,
      default: () => v4().split('-')[0]
    }
  )
  slug: string;
  @Prop({
    type: mongoose.Schema.Types.String,
    required: [true, 'Please enter password'],
  })
  password: string;
  @Prop({
    type: mongoose.Schema.Types.String,
    unique: [true, 'it exists'],
  })
  email: string;
  @Prop({
    type: mongoose.Schema.Types.String,
    required: [true, 'Please enter sex'],
  })
  sex: string;
  @Prop({
    type: mongoose.Schema.Types.String,
    required: [true, 'Please enter birthday'],
  })
  birthday: string;
  @Prop({
    type: mongoose.Schema.Types.String,
    required: [true, 'Please enter numberPhone'],
  })
  phone: string;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'LevelMember' })
  level_member: MemberLevel;

  @Prop({
    type: mongoose.Schema.Types.String,
    required: [true, 'Please enter fullName'],
  })
  fullname: string;

  @Prop({
    type: mongoose.Schema.Types.String,
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
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Product' })
  product: Product[];

  //One to Many Order
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Order' })
  orders: Order[];

  @Prop({type: [{type: mongoose.Schema.Types.String}]})
  feedbacks: string[];

  @Prop({type: mongoose.Schema.Types.Number,default: 0})
  score: number;

  @Prop({type: mongoose.Schema.Types.String})
  refreshToken: string //refreshtoken
}

export const UserSchema = SchemaFactory.createForClass(User);
