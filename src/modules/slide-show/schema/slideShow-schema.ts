import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Slide } from 'src/modules/slide/schema/slide-schema';


@Schema({timestamps:true})
export class Slideshow {


  @Prop({ default: false })
  is_show: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Slide' }] })
  slides: Types.ObjectId[];
}

export const SlideshowSchema = SchemaFactory.createForClass(Slideshow);