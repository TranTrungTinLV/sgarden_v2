import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CountDownDto {
  
  @ApiProperty({description: 'tiêu đề giới thiệu'})
  readonly title: string;

  @ApiProperty({description: 'thời gian diễn ra'})
  readonly time_countdown: Date;

  @ApiProperty({description: 'hình ảnh'})
  image: string;
  
  @ApiProperty({description: 'link liên kết'})
  navigate_link: string;

  @ApiProperty({description: 'hiện thị hay không true/false'})
  is_show: boolean
}
