import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorations';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guard/roles.gaurd';
import { Role } from 'src/modules/users/schema/users.schema';
import { multerOptions } from 'src/utils/uploadImage';

import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';
import { Product } from './schema/product.schema';
import { CreateReviewDto } from './dtos/create-review.dto';
import { ParsePricesPipe } from 'src/common/interceptors/swagger-array-convertions.interface';

@ApiSecurity('bearerAuth')
@ApiTags('Product')
@Controller('product')
@UseGuards(RolesGuard)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}
  @Roles([Role.Admin, Role.Staff])
  @Post()
  @UsePipes(new ParsePricesPipe())
  @ApiBody({
    description: 'Thông tin sản phẩm mới',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        price_original: { type: 'number' },
        price_new: { type: 'number' },
        isPublished: { type: 'boolean' },
        quantityInStock: { type: 'number' },
        prices: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              size: { type: 'string' },
              original_price: { type: 'number' },
              new_price: { type: 'number' },
            },
          },
        },
        quantity: { type: 'number' },
        categoryName: { type: 'string' },
        images: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('images',5,multerOptions('products')),
    ) //images
    @ApiConsumes('multipart/form-data')
   
  @ApiOperation({ summary: 'Tạo sản phẩm', description: 'Yêu cầu role: Staff hoặc Admin' })
  //thêm sản phẩm
  async createProduct(
    @UploadedFiles() files: Array<Express.Multer.File>, //images
    @Body() createProductDto: CreateProductDto,
    @Req() request: any,
  ): Promise<Product> {
    console.log('files',files)
    const imagePath = files.map(file => file.path)
    console.log("imagePath",imagePath)
    createProductDto.images = files.map(file => `images/products/${file.filename}`)
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
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Xóa thành công' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Xóa thất bại' })
  @Roles([Role.Admin,Role.Staff])
  @ApiOperation({ summary: 'Xoá Sản phẩm', description: 'Yêu cầu role: Staff hoặc Admin' })
  async deleteProduct(
    @Param('productId') productId:string
  ){
    return this.productService.deleteProduct(productId)
  }

  //Xóa nhiều sản phẩm
  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Xóa thành công' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Xóa thất bại' })
  @ApiOperation({ summary: 'Xoá nhiều sản phẩm', description: 'Yêu cầu role: Admin' })
  @Roles([Role.Admin,Role.Staff])
  async deleteManyProducts(
    @Body() ids: string[]
  ): Promise<any> {
    return this.productService.deleteMany(ids)
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
  async getAllProducts(@Query() filterProductDto: CreateProductDto): Promise<Product[]> {
    return this.productService.findAllProducts(filterProductDto.name);
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

  @Post(':productId/reviews')
  @ApiOperation({ summary: 'Review comment', description: 'User, star tối đa từ 1 đến 5' })

  @Roles([Role.User])
  // @Public()
  async addReview(
    @Param('productId') productId: string,
    @Body() creatReviewDto: CreateReviewDto,
    @Req() request: any
  ): Promise<Product>{
    const username = request.user.username;
    console.log(username)
    return this.productService.addReview(productId,username,creatReviewDto)
  }
}
