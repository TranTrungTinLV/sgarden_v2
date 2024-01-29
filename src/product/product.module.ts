import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from 'src/category/category.module';
import { Category, CategorySchema } from 'src/category/schema/category.schema';
import { UsersModule } from 'src/users/users.module';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema } from './schema/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductSchema,
      },
      {
        name: 'Category',
        schema: CategorySchema,
      },
    ]),
    UsersModule,

  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
