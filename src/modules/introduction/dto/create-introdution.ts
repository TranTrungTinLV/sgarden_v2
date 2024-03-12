import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class IntroductionDto {
  
  @ApiProperty({description: 'tiêu đề giới thiệu'})
  readonly title: string;

  @ApiProperty({description: 'nội dung giới thiệu'})
  readonly content: string;

  @ApiProperty({description: 'hình ảnh'})
  image: string;
}
