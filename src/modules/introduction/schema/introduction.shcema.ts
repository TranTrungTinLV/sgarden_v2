import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Introduction {
  @Prop({type: mongoose.Schema.Types.String})
  title: string;

  @Prop({type: mongoose.Schema.Types.String})
  content: string;

  @Prop({type: mongoose.Schema.Types.String})
  image: string;
}

export const IntroductionShcema = SchemaFactory.createForClass(Introduction);
