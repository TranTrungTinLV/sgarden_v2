import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum MemberLevel {
    BASIC = 'BASIC',
    SILVER = 'SILVER',
    GOLD = 'GOLD',
    PLATINUM = 'PLATINUM'
}
@Schema({
    timestamps: true
})

export class LevelMember extends Document {
    @Prop({
        type: String,
        enum: MemberLevel,
        default: MemberLevel.BASIC,
    })
    level_name: MemberLevel;

    @Prop({
        required: true,
    })
    discount: number;

    @Prop()
    description: string;
    @Prop()
    icon: string;
}

export const LevelMemberSchema = SchemaFactory.createForClass(LevelMember)