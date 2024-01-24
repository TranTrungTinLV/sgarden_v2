import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/product/schema/product.schema';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schema/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,

  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }
  async create(name: string): Promise<Category> {
    const newCategory = new this.categoryModel({ name });
    return newCategory.save();
  }

  async findProductsByCategory(categoryId: string): Promise<Category> {
    return this.categoryModel.findById(categoryId).populate('products').exec();
  }
  // create(createCategoryDto: CreateCategoryDto) {
  //   return 'This action adds a new category';
  // }

  // findAll() {
  //   return `This action returns all category`;
  // }

//  async findOne(id: string): Promise<Category[]> {
//     const 
//     return  `This action returns a #${id} category`;
//   }

  // update(id: number, updateCategoryDto: UpdateCategoryDto) {
  //   return `This action updates a #${id} category`;
  // }

  // remove(id: string): Promise<Category> {
  //   return `This action removes a #${id} category`;
  // }
}
