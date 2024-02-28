import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Product } from 'src/modules/product/schema/product.schema';
// import { User } from 'src/users/schema/users.schema';

@Schema({
    timestamps: true
})
export class Category extends Document {
    @Prop({unique: [true, 'it exists']})
    name: string;

    //Many to Many
    @Prop({type: [mongoose.Schema.Types.ObjectId], ref: 'Product'})
    products: Product[];

    @Prop({type: mongoose.Schema.Types.String})
    image: string;

    @Prop({type: mongoose.Schema.Types.String})
    icon_name?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category)

