import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    timestamps: true,
})

export class DiscountCode extends Document {
    @Prop({required: true,unique:true})
    code:string;
    @Prop({required: true})
    valid_to: Date; //Ngày hết hạn của mã giảm giá.
    @Prop({default: false})
    isUsed: boolean; //Trạng thái sử dụng của mã giảm giá, mặc định là false
    @Prop({required: true})
    discount: number; //% của mã giảm giá
}

export const DiscountcodeSchema = SchemaFactory.createForClass(DiscountCode)    