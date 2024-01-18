import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/users/roles.gaurd';
import { ProductService } from './product.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/users/schema/users.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './schema/product.schema';

@Controller('product')
@UseGuards(RolesGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles([Role.Admin])
  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.createProduct(createProductDto);
  }

  @Roles([Role.Admin])
  @Get(':id')
  async getproductById(@Param('id') id: string): Promise<Product> {
    return this.productService.findByIdProduct(id);
  }

  @Roles([Role.Admin])
  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.findAllProducts();
  }
}
