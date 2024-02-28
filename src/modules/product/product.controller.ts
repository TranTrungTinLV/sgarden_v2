import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guard/roles.gaurd';
import { Role } from 'src/modules/users/schema/users.schema';
import { UsersService } from 'src/modules/users/users.service';

import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';
import { Product } from './schema/product.schema';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorations';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/utils/uploadImage';

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
  @UseInterceptors(
    FilesInterceptor('images',5,multerOptions('products')),
    ) //images
  //thêm sản phẩm
  async createProduct(
    @UploadedFiles() files: Array<Express.Multer.File>, //images
    @Body() createProductDto: CreateProductDto,
    @Req() request: any,

  ): Promise<Product> {
    console.log('files',files)
    const imagePath = files.map(file => file.path)
    console.log("imagePath",imagePath)
    createProductDto.images = files.map(file => `/images/products/${file.filename}`)
    //images + products + images 
    console.log(createProductDto.images)
    const username = request.user.username;
    console.log(username);
   
    return await this.productService.createProduct(createProductDto, username);
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
  @Public()
  async getproductById(@Param('id') id: string): Promise<Product> {
    return this.productService.findByIdProduct(id);
  }

  @Get()
  @Public()
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
