import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category } from 'src/modules/category/schema/category.schema';
import { UsersService } from 'src/modules/users/users.service';

import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './schema/product.schema';
import { CreateReviewDto } from './dtos/create-review.dto';
import { User } from '../users/schema/users.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
    private readonly usersService: UsersService,
  ) {}

  //thêm sản phẩm
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
      category: category.name, // Sử dụng ID của danh mục tìm được
    });
    // Cập nhật danh mục với sản phẩm mới
  await this.categoryModel.findByIdAndUpdate(category._id, {
    $push: { products: (await newProduct)._id },
  });
    // category.products.push( newProduct._id);
    // await category.save();
    return newProduct;
  }

  //Sửa sản phẩm
  async updateproduct(productId:string,updateProductDto: UpdateProductDto): Promise<Product>{
    const product = await this.productModel.findById(productId);
    if(!product) {
      throw new NotFoundException(`Không tìm thấy ID ${productId} để thực hiện việc sửa sản phẩm`)
    }
    //update feild product
   product.name = updateProductDto.name;
   product.price_original = updateProductDto.price_original;
   product.price_new = updateProductDto.price_new
    return product.save();
  }

  // Xóa sản phẩm
  async deleteProduct(productId:string): Promise<any> {
    const product = await this.productModel.findById(productId);
    if(!product){
      throw new NotFoundException(`Không tìm thấy sản phẩm với ID ${productId}`);
    }
    const result = await this.productModel.deleteOne({_id: productId});
    if(result.deletedCount === 0) {
      throw new NotFoundException(`Không tìm thấy ${productId} để xóa`)
    }
    // Cập nhật danh mục bằng cách loại bỏ sản phẩm khỏi danh sách sản phẩm của danh mục
    await this.categoryModel.findByIdAndUpdate(product.category_id,{
      $pull: {
        products: productId
      }
    })
    return result;
  }

  async findAllProducts(keyword?:string): Promise<Product[]> {
    let query = {};
    if(keyword){
      query = {name: {$regex: keyword, $options: 'i' }}
      const products = await this.productModel.find(query).populate('owner','username').exec();
      if(products.length === 0){
        throw new NotFoundException(`Oops, we don’t have any results for "${keyword}"`);
      }
      return products
    }
    else
    {
      return this.productModel.find().populate('owner','username').populate('images');

    }
  }

  async findByIdProduct(productId: string): Promise<Product> {
    const product = await this.productModel.findById(productId)
    return product.populate('owner','username');
  }

  async updateProductStock(productId: string, newStock:number): Promise<Product> {
    const product = await this.productModel.findById(productId);
    if(!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`)
    };
    product.quantityInStock = newStock;
    return product.save();
  }

  async deleteMany(ids: string[]):Promise<any> {
    const result = await this.productModel.deleteMany({_id: {$in: ids}});
    if(result.deletedCount === 0) {
      console.log(result)
      throw new NotFoundException(`Không tìm thấy sản phẩm để xóa`);
    }
    return result;
  }

  async addReview(productId: string, customerId: string, createReviewDto: CreateReviewDto): Promise<Product> {
    // Đảm bảo rằng customer tồn tại
    const customer = await this.usersService.findOne(customerId);
    if (!customer) {
      throw new NotFoundException(`Không tìm thấy người dùng với ID ${customerId}`);
    }
  
    // Tìm sản phẩm
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm với ID ${productId}`);
    }
  
    // Tạo review mới và bao gồm customerId
    const review = {
      ...createReviewDto,
      customerId: customer._id, // Sử dụng _id của customer đã tìm được
      username: customer.username
    };
    console.log(review)
  
    // Thêm review vào sản phẩm
    product.reviews.push(review);
  
    // Lưu sản phẩm đã cập nhật
    await product.save();
  
    // Trả về sản phẩm đã cập nhật
    return product;
  }
  
}