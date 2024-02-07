import { Body, Controller, Delete,Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decators/roles.decorator';
import { RolesGuard } from 'src/common/guard/roles.gaurd';
import { Role } from 'src/users/schema/users.schema';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './schema/category.schema';
import { ApiBearerAuth, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiSecurity('bearerAuth')
@ApiTags('Category')
@Controller('category')
@ApiBearerAuth()
@UseGuards(RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles([Role.Staff,Role.Admin])
  @ApiOperation({ summary: 'Tạo danh mục', description: 'Yêu cầu role: Staff hoặc Admin' })

  create(@Body() createCategoryDto: CreateCategoryDto) {
    const {name} = createCategoryDto
    return this.categoryService.create(name);
  }

  @Get()
  @Roles([Role.Staff,Role.Admin])
  @ApiOperation({ summary: 'Lấy tất cả danh mục', description: 'Yêu cầu role: Staff hoặc Admin' })
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id/products')
  @Roles([Role.Admin,Role.Staff])
  @ApiOperation({ summary: 'Lấy sản phẩm theo danh mục', description: 'Yêu cầu role: Admin,Staff' })

  findOne(@Param('id') categoryId: string): Promise<Category> {
    return this.categoryService.findProductsByCategory(categoryId);
  }
}
