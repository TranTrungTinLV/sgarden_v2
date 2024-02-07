import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { Document, Types } from "mongoose";
import { User } from "src/users/schema/users.schema";

@Schema({
    timestamps: true,
})

export class MailMsg extends Document{
    @Prop({
        type: String,
        required: true
    })
    from: string;

    @Prop({
        type: String,
        required: true
    })
    to: string;

    @Prop(
        {
            required: true,
            type: String
        }
    )
    message: string;

    @Prop(
        {
            required: true,
            type: String
        }
    )
    subject: string;

    @Prop(
        {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    )
    sentBy: User | Types.ObjectId;
    
    @Prop(
        {
            required: false,
            default: false
        }
    )
    isFlagged: boolean

}

export const MailerSchema = SchemaFactory.createForClass(MailMsg)