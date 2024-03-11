import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Information {
  @Prop({
    required: true,
    type: String,
  })
  address: string;
  @Prop({
    required: true,
    type: String,
  })
  phone: string;
  @Prop({
    required: true,
    type: String,
  })
  email: string;
}
