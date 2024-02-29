import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDto {

    @ApiProperty({
        description: 'tên danh mục'
    })
    @IsString()
    readonly name: string;

    @ApiProperty({
        description: 'mô tả danh mục'
    })
    @IsString()
    readonly description: string;

    @ApiProperty({description: 'hình ảnh'})
    image: string;
}
