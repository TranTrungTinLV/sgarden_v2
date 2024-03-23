import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";


@Schema({
    timestamps: true
})

export class Footer extends Document {
    @Prop({
        type: mongoose.Schema.Types.String,
        required: [true, 'Vui lòng nhập số điện thoại']
    })
    phone: string;

    @Prop({
        type: mongoose.Schema.Types.String,
        required: [true,'Vui lòng đặt logo']
    })
    logo?: string;
    
    @Prop({
        type: mongoose.Schema.Types.String,
        required: [true,'Vui lòng nhập địa chỉ']
    })
    address: string

    @Prop({
        type: mongoose.Schema.Types.String,
        required: [true,'Vui lòng nhập maps']
    })
    maps: string
}

export const FooterSchema = SchemaFactory.createForClass(Footer)