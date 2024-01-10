import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: [true, 'Please enter userName'],
  })
  username: string;
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
  @Prop()
  level_member: string; //edit late
  @Prop({
    required: [true, 'Please enter fullName'],
  })
  fullname: string;
  @Prop()
  score: string; //edit late
  @Prop()
  
  @Prop({
    type: String,
    default:
      'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-541.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1702512000&semt=ais',
  })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
