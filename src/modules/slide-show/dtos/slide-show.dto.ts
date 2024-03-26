import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsArray, IsMongoId, IsString } from 'class-validator';

export class CreateSlideshowDto {

  @ApiProperty({description: 'lọc hiển thị hay không hiển thị?', required: true})
  @IsBoolean()
  is_show: boolean;
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsMongoId({ each: true })
  slides_id?: string[];
}