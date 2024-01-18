import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dtos/create-product.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    private readonly usersService: UsersService,

  ) {}
  async createProduct(
    createProductDto: CreateProductDto,
    username: string
  ) {
    const owner = await this.usersService.findOne(username);
    if (!owner) {
      throw new Error('Không tìm thấy người dùng');
    }
    const newProduct = this.productModel.create({
      ...createProductDto,
      owner: owner._id,
    });
    return newProduct;
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productModel.find();
  }

  async findByIdProduct(productId: string): Promise<Product> {
    return this.productModel.findById(productId);
  }
}
