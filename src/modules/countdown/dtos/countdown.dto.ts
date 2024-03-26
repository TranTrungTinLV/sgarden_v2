import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CountDownDto {
  
  @ApiProperty({description: 'tiêu đề giới thiệu'})
  @IsString()
  readonly title: string;

  @ApiProperty({description: 'thời gian diễn ra'})
  @IsDate()
  readonly time_countdown: Date;

  @ApiProperty({ description: 'hình ảnh', type: 'string', format: 'binary' })
  image: any;
  
  @ApiProperty({description: 'link liên kết'})
  @IsString()
  readonly navigate_link: string;

  @ApiProperty({description: 'hiện thị hay không true/false'})
  @IsBoolean()
   is_show: boolean
}
