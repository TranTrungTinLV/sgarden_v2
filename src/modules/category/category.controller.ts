import { Body, Controller, Delete,Get, HttpCode, HttpStatus, Param, Post, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { join } from 'path';
import { Roles } from 'src/common/decators/roles.decorator';
import { Public } from 'src/common/decorators/public.decorations';
import { RolesGuard } from 'src/common/guard/roles.gaurd';
import { Role } from 'src/modules/users/schema/users.schema';
import { multerOptions } from 'src/utils/uploadImage';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { SearchCategoryFilter } from './dto/get-category-filter-dto';
import { Category } from './schema/category.schema';

@ApiSecurity('bearerAuth')
@ApiTags('Category')
@Controller('category')
@ApiBearerAuth()
@UseGuards(RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Đăng danh mục thành công' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Đăng danh mục thất bại' })
  @UseInterceptors(FileInterceptor('image',multerOptions('categoryImage')))
  @Roles([Role.Staff,Role.Admin])
  @ApiOperation({ summary: 'Tạo danh mục', description: 'Yêu cầu role: Staff hoặc Admin' })
  create(@Body() createCategoryDto: CreateCategoryDto,@UploadedFile() file: Express.Multer.File) {
    if(file){
      createCategoryDto.image = file.path
      console.log(file)
      console.log("ok")
    }
    return this.categoryService.create(createCategoryDto);
  }


  
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Xóa thành công' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Xóa thất bại' })
  @Roles([Role.Admin])
  @ApiOperation({summary: 'Xóa danh mục theo ID',description: 'Yêu cầu Admin'})
  async deleteCategory(@Param('id') id:string){
    return this.categoryService.deleteCategory(id)
  }

  @Public()
  @Get('/categoryImage/:file')
  
  async getPicture(@Param('file') file, @Res() res:Response) {
    if(!file){
      res.statusMessage
    }
    const imagePath = join(process.cwd(), 'storage/images/categoryImage', file);
    res.sendFile(imagePath);
  } 

  // @Public()
  // @ApiOperation({ summary: 'Filter' })
  // @Get()
  // getFilterCategory(@Query('keyword') keyword: string) {
  //   return this.categoryService.findCategoryWithSearch(keyword)
  // }

  @Get()
  @Public()
  async getAllCategories(@Query() filterCateDto:SearchCategoryFilter): Promise<Category[]> {
    return this.categoryService.findAll(filterCateDto.name);
  }

  @Get(':categoryId')
  @Public()
  findOne(@Param('categoryId') categoryId: string): Promise<Category> {
    return this.categoryService.findProductsByCategory(categoryId);
  }
}

