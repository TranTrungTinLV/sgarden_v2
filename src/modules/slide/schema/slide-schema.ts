import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsOptional } from "class-validator";
import mongoose from "mongoose";

@Schema({
    timestamps: true
})

export class Slide {
    @Prop({type: mongoose.Schema.Types.String,unique: true, required: true})
    title: string;

    @Prop({type: mongoose.Schema.Types.String, required: true})
    detail: string;

    @Prop({type: mongoose.Schema.Types.String, required: true})
    image: string;

    @Prop({type: mongoose.Schema.Types.String, required: true})
    navigate_link: string

    @ApiProperty({ required: false })
    @IsMongoId()
    @IsOptional()
    slideshowId?: string; // Thêm trường này
}

export const SlideSchema = SchemaFactory.createForClass(Slide)