import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dtos/create-product.dto';
import { UsersService } from 'src/users/users.service';
import { Category } from 'src/category/schema/category.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
    private readonly usersService: UsersService,
  ) {}
  async createProduct(createProductDto: CreateProductDto, username: string): Promise<Product> {
    const owner = await this.usersService.findOne(username);
    if (!owner) {
      throw new Error('Không tìm thấy người dùng');
    }

    const category = await this.categoryModel.findOne({ name: createProductDto.categoryName });
    console.log(category)
    if (!category) {
      throw new Error('Không tìm thấy danh mục');
    }
    const newProduct = this.productModel.create({
      ...createProductDto,
      owner: owner._id,
      category: category._id, // Sử dụng ID của danh mục tìm được
    });
    // Cập nhật danh mục với sản phẩm mới
  await this.categoryModel.findByIdAndUpdate(category._id, {
    $push: { products: (await newProduct)._id },
  });
    // category.products.push( newProduct._id);
    // await category.save();
    return newProduct;
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productModel.find();
  }

  async findByIdProduct(productId: string): Promise<Product> {
    return this.productModel.findById(productId);
  }
}
