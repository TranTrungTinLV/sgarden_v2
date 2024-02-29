import { HttpCode, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/modules/product/schema/product.schema';

import { CreateCategoryDto } from './dto/create-category.dto';
import { SearchCategoryFilter } from './dto/get-category-filter-dto';
import { Category } from './schema/category.schema';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,

  ) {}

  async findAll(keyword?:string): Promise<Category[]> {
    if (keyword) {
      return this.categoryModel.find({
        name: { $regex: keyword, $options: 'i' },
      }).populate('products', 'name price_original price_new').exec();
    } else {
      return this.categoryModel.find().populate('products', 'name price_original price_new image').exec();
    }
    // console.log(this.categoryModel.find().populate('products','name price_original'))
    // return this.categoryModel.find().populate('products','name price_original price_new').exec();
  }

  async findCategoryWithSearch(keyword: string) {
    if(!keyword){
      console.log("lỗi")
      return this.categoryModel.find().exec();
    }
    return this.categoryModel.find({
      name: {
        $regex: keyword, $options: 'i'
      }
    }).populate('products','name price_original price_new').exec();
  }

  async create(category: CreateCategoryDto): Promise<Category> {
    const newCategory = await this.categoryModel.create(category);
    return newCategory;
  }

  async findProductsByCategory(categoryId: string): Promise<Category> {
    const category = (await this.categoryModel.findById(categoryId));
    console.log(category);
    return category.populate('products','name');
  }

  //Xóa Danh mục
  
  async deleteCategory(id:string) {
    const result = await this.categoryModel.deleteOne({_id: id})
    if(result.deletedCount === 0) {
      throw new NotFoundException(`Không tìm thấy ${id} để xóa danh mục`)
    }else{
      return result;
    }
  }

  //Sửa sản phẩm theo tên
  async updateCategory(id:string,updateCategory: UpdateCategoryDto): Promise<Category>{
    const category = await this.categoryModel.findById(id);
    if(!category){
      throw new Error(`Không tìm thấy ID ${id} để cập nhật danh mục`)
    }
    //update category
    category.name = updateCategory.name;
    return category.save()
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
