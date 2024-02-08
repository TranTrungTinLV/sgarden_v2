import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guard/roles.gaurd';
import { Role } from 'src/users/schema/users.schema';
import { UsersService } from 'src/users/users.service';

import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';
import { Product } from './schema/product.schema';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiSecurity('bearerAuth')
@ApiTags('Product')
@Controller('product')
@UseGuards(RolesGuard)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Roles([Role.Admin, Role.Staff])
  @ApiOperation({ summary: 'Tạo sản phẩm', description: 'Yêu cầu role: Staff hoặc Admin' })

  @Post()
  //thêm sản phẩm
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Req() request: any,
  ) {
    const username = request.user.username;
    console.log(username);
    return this.productService.createProduct(createProductDto, username);
  }

  //sửa sản phẩm
  @Patch(':productId')
  @Roles([Role.Admin,Role.Staff])
  @ApiOperation({ summary: 'Cập nhật sản phẩm', description: 'Yêu cầu role: Staff hoặc Admin' })

  async updateProduct(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ){
   return this.productService.updateproduct(productId,updateProductDto)
  }

  //Xóa sản phẩm
  @Delete(':productId')
  @Roles([Role.Admin,Role.Staff])
  @ApiOperation({ summary: 'Xoá Sản phẩm', description: 'Yêu cầu role: Staff hoặc Admin' })

  async deleteProduct(
    @Param('productId') productId:string
  ){
    return this.productService.deleteProduct(productId)
  }

  //lấy sản phẩm
  @Get(':id')
  @Roles([Role.Admin])
  @ApiOperation({ summary: 'Lấy sản phẩm qua id', description: 'Yêu cầu role: Admin' })
  async getproductById(@Param('id') id: string): Promise<Product> {
    return this.productService.findByIdProduct(id);
  }

  @Get()
  @Roles([Role.Admin, Role.Staff, Role.User])
  @ApiOperation({ summary: 'Lấy hết sản phẩm', description: 'Yêu cầu role: Staff hoặc Admin, User' })

  async getAllProducts(): Promise<Product[]> {
    return this.productService.findAllProducts();
  }

  @Patch(':productId/stock')
  @Roles([Role.Admin,Role.Staff])
  @ApiOperation({ summary: 'cập nhật số lượng tồn kho sản phẩm', description: 'Yêu cầu role: Staff hoặc Admin' })

  async updateProductStock(
    @Param('productId') productId:string,
    @Body('quantityStock') quantityStock: number
  ) {
    return this.productService.updateProductStock(productId,quantityStock)
  }
}
