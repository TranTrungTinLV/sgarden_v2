import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/common/guard/roles.gaurd';
import { ProductService } from './product.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/users/schema/users.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './schema/product.schema';
import { UsersService } from 'src/users/users.service';

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
    // const owner = await this.usersService.findOne(username);
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
