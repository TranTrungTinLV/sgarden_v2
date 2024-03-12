import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from 'src/modules/product/product.module';
import { ProductSchema } from 'src/modules/product/schema/product.schema';
import { UsersModule } from 'src/modules/users/users.module';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategorySchema } from './schema/category.schema';

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
