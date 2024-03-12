import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class PriceDto {
  
  @ApiProperty({description: 'size'})
  @IsString()
  size: 'M' | 'L' | 'N'; // M, L, hoặc N (not set)

  @ApiProperty({description: 'giá gốc'})
  @IsNumber()
  original_price: number;
  @ApiProperty({description: 'giá mới'})

  @IsNumber()
  new_price: number;
}

