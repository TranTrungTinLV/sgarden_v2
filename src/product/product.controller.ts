import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guard/roles.gaurd';
import { Role } from 'src/users/schema/users.schema';
import { UsersService } from 'src/users/users.service';

import { CreateProductDto } from './dtos/create-product.dto';
import { ProductService } from './product.service';
import { Product } from './schema/product.schema';

@Controller('product')
@UseGuards(RolesGuard)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly usersService: UsersService,
  ) {}

  @Roles([Role.Admin, Role.Staff])
  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Req() request: any,
  ) {
    const username = request.user.username;
    console.log(username);
    return this.productService.createProduct(createProductDto, username);
  }

  @Roles([Role.Admin])
  @Get(':id')
  async getproductById(@Param('id') id: string): Promise<Product> {
    return this.productService.findByIdProduct(id);
  }

  @Roles([Role.Admin, Role.Staff])
  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.findAllProducts();
  }
}
