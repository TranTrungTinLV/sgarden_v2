import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Introduction {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  image: string;
}

export const IntroductionShcema = SchemaFactory.createForClass(Introduction);
