import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product-dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  getAll() {
    this.productService.getAll();
  }
  @Post()
  @UseGuards(AuthGuard)
  createProduct(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }
}
