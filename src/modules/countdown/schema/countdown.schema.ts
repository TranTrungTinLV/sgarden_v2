import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { create } from "domain";
import mongoose from "mongoose";

@Schema(
    {
        timestamps: true,
    }
)

export class CountDownEvent {
    @Prop({type: mongoose.Schema.Types.String})
    title: string;

    @Prop({type: mongoose.Schema.Types.Date})
    time_countdown: Date;

    @Prop({type: mongoose.Schema.Types.String})
    image: string;

    @Prop({type: mongoose.Schema.Types.String})
    navigate_link: string;

    @Prop({type: mongoose.Schema.Types.Boolean,default: false})
    is_show: boolean;
}

export const CountDownEventSchema = SchemaFactory.createForClass(CountDownEvent)