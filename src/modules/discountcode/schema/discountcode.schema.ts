import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({
    timestamps: true,
})

export class DiscountCode {
    @Prop({required: true,unique:true,type: mongoose.Schema.Types.String})
    code: string;

    @Prop({required: false,type: mongoose.Schema.Types.Date})
    valid_to: Date; //Ngày hết hạn của mã giảm giá.
    @Prop({default: false, type: mongoose.Schema.Types.Boolean})
    isUsed: boolean; //Trạng thái sử dụng của mã giảm giá, mặc định là true
    @Prop({required: false, type: mongoose.Schema.Types.Number})
    discount: number; //% của mã giảm giá
}

export const DiscountcodeSchema = SchemaFactory.createForClass(DiscountCode)    