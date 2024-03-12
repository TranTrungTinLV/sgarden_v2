import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export enum OptionSize {
    Medium = 'M',
    Large = 'L',
    NotSet = 'N',
  }
@Schema({
    timestamps: true
})

export class Price{
    @Prop({ type: mongoose.Schema.Types.String,
        enum: OptionSize,
        default: OptionSize.NotSet,
})
    size: OptionSize;
  
    @Prop()
    original_price: number;
  
    @Prop()
    new_price: number;
}

export const PriceSchema = SchemaFactory.createForClass(Price)