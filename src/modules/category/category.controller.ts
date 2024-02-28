import { Body, Controller, Delete,Get, Param, Patch, Post, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Roles } from 'src/common/decators/roles.decorator';
import { RolesGuard } from 'src/common/guard/roles.gaurd';
import { Role } from 'src/modules/users/schema/users.schema';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './schema/category.schema';
import { ApiBearerAuth, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/utils/uploadImage';
import { Response } from 'express';
import { join } from 'path';
import { Public } from 'src/common/decorators/public.decorations';

@ApiSecurity('bearerAuth')
@ApiTags('Category')
@Controller('category')
@ApiBearerAuth()
@UseGuards(RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
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

  @Public()
  @Get('/categoryImage/:file')
  
  async getPicture(@Param('file') file, @Res() res:Response) {
    if(!file){
      res.statusMessage
    }
    const imagePath = join(process.cwd(), 'storage/images/categoryImage', file);
    res.sendFile(imagePath);
  } 

  @Public()
  @Get()
  getFilterCategory(@Query('keyword') keyword: string) {
    return this.categoryService.findCategoryWithSearch(keyword)
  }

  @Get()
  @Roles([Role.Admin])
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':categoryId')
  @Public()
  findOne(@Param('categoryId') categoryId: string): Promise<Category> {
    return this.categoryService.findProductsByCategory(categoryId);
  }
}

