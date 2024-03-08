import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateSlideDto {
    @ApiProperty({description: 'tiêu đề Slide', required: true})
    @IsString()
    readonly title: string;

    @ApiProperty({description: 'chi tiết Slide', required: true})
    @IsString()
    readonly detail: string;

    @ApiProperty({description: 'hình ảnh Slide', required: true})
    @IsString()
     image: string;

    @ApiProperty({description: 'link chi tiêt Slide', required: true})
    @IsString()
    readonly navigate_link: string;


}