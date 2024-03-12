import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { create } from "domain";
import mongoose from "mongoose";

@Schema(
    {
        timestamps: true,
    }
)

export class CountDownEvent {
    @Prop({type: mongoose.Schema.Types.String,required:true})
    title: string;

    @Prop({type: mongoose.Schema.Types.Date})
    time_countdown: Date;

    @Prop({type: mongoose.Schema.Types.String})
    image: string;

    @Prop({type: mongoose.Schema.Types.String})
    navigate_link: string;

    @Prop({type: mongoose.Schema.Types.Boolean,default: true})
    is_show: boolean;
}

export const CountDownEventSchema = SchemaFactory.createForClass(CountDownEvent)