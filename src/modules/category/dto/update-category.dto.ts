import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto{
    @ApiProperty({
        description: 'tên danh mục'
    })
    @IsString({
        message: "Vui lòng nhập tên danh mục"
    })
    @IsNotEmpty()
    readonly name: string;
}
