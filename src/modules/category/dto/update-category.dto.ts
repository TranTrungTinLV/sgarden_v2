import { PartialType } from '@nestjs/swagger';

import { CreateCategoryDto } from './create-category.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
    @IsOptional()
  @IsString()
  readonly name?: string;

}
