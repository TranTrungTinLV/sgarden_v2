import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/modules/product/schema/product.schema';

import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './schema/category.schema';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,

  ) {}


  

  async findAllWithProductCount(keyword?:string): Promise<Category[]> {
    let query = {}
    if(keyword){
      query = {
        $match: {
          name: { $regex: keyword, $options: 'i' },
        },
      };
    }

    const pipeline: any[] = [query,
      {
        $lookup: {
        from: "products", // Đảm bảo đây là tên chính xác của collection sản phẩm
        localField: "name",
        foreignField: "category", // Trường trong sản phẩm chứa ID của danh mục
        as: "products"
        }
      },
      {
        $addFields: {
          productCount: { $size: "$products" }
        },
        
        
        
      },
      {
        $project: {
        _id: 1,
        name: 1,
        image: 1,
        createdAt: 1,
        updatedAt: 1,
        __v: 1,
        productCount: 1,
        products: 1 // Đảm bảo rằng mảng products được trả về
      }}
    ];
    

    if (!keyword) {
      pipeline.shift(); // Loại bỏ phần tử đầu tiên của mảng nếu không có từ khóa
    }


    return await this.categoryModel.aggregate(pipeline).exec();

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
    }).populate('products','name price_original price_new images').exec();
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

  //sửa tên danh mục
  async updateCategory(categoryId: string,updateCategory: UpdateCategoryDto): Promise<Category>{
    const category = await this.categoryModel.findById(categoryId);
    if(!category){
      throw new NotFoundException(`Không tìm thấy ID ${category} để chỉnh sửa`)
    }
    Object.entries(updateCategory).forEach(([key,value]) => {
      if(value !== undefined && value !== '') {
        category[key] = value
      }
    })
    //update category name only name
    // category.name = updateCategory.name;
    return category.save()
  }
}
