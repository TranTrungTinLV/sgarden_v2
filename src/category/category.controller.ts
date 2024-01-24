import { Body, Controller, Delete,Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decators/roles.decorator';
import { RolesGuard } from 'src/common/guard/roles.gaurd';
import { Role } from 'src/users/schema/users.schema';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './schema/category.schema';
import { Product } from 'src/product/schema/product.schema';

@Controller('category')
@UseGuards(RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles([Role.Staff])
  create(@Body() createCategoryDto: CreateCategoryDto) {
    const {name} = createCategoryDto
    return this.categoryService.create(name);
  }

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id/products')
  findOne(@Param('id') categoryId: string): Promise<Category> {
    return this.categoryService.findProductsByCategory(categoryId);
  }
}
