import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from 'src/modules/category/category.module';
import { Category, CategorySchema } from 'src/modules/category/schema/category.schema';
import { UsersModule } from 'src/modules/users/users.module';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema } from './schema/product.schema';
import { Review, ReviewSchema } from './schema/product_review.schema';
import { PriceSchema } from '../price/schema/price.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductSchema,
      },
      {
        name: 'ProductReview',
        schema: ReviewSchema,
      },
      {
        name: 'Category',
        schema: CategorySchema,
      },
      {name: 'Size',schema: PriceSchema}
    ]),
    UsersModule,

  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
