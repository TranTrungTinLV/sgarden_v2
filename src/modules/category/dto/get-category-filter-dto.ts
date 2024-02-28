import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SearchCategoryFilter {

    @ApiProperty({
        description: 'tên danh mục'
    })
    @IsNotEmpty()
    name?: string;

    // @ApiProperty({description: 'hình ảnh'})
    @IsOptional()
    @IsString()
    search?: string;
    
    
}
