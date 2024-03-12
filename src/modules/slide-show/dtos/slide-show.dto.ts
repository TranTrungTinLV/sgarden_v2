import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsArray, IsMongoId, IsString } from 'class-validator';

export class CreateSlideshowDto {

  @ApiProperty()
  @IsBoolean()
  is_show: boolean;
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsMongoId({ each: true })
  slides_id: string[];
}