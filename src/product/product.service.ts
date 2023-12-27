import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product-dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productRepository.find({});
  } 
//   async create(product: Product): Promise<Product>{
//     const product = await this.productRepository.create(product);
//     return product;
//   }
  async findProductsWithCategory(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['category'] });
  }

  create(productDto: CreateProductDto){
    const product = this.productRepository.create(productDto);
    return this.productRepository.save(product);
  }
}
 