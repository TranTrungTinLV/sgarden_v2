import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from 'src/product/product.module';
import { UsersModule } from 'src/users/users.module';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategorySchema } from './schema/category.schema';
import { ProductSchema } from 'src/product/schema/product.schema';

@Module({
  imports: [
    ProductModule,
    UsersModule,
    MongooseModule.forFeature([{
      name: 'Category',
      schema: CategorySchema,
    },
  {
    name: 'Product',
    schema: ProductSchema
  }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
