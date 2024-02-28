import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class SearchCategoryFilter {

    @ApiProperty({
        description: 'tên danh mục'
    })
    @IsString()
    name?: string;

    @ApiProperty({description: 'hình ảnh'})
    @IsOptional()
    @IsString()
    search?: string;
    
    
}
