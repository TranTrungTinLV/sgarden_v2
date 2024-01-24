import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
// import { User } from 'src/users/schema/users.schema';

@Schema({
    timestamps: true
})
export class Category extends Document {
    @Prop({unique: [true, 'it exists']})
    name: string;

    //Many to Many
    @Prop({type: Types.ObjectId, ref: 'Product'})
    parent_category: Types.ObjectId[];

    @Prop({type: [String], required: true})
    images?: string;

    @Prop({type: String})
    icon_name?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category)

