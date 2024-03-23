import { UsePipes } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ParsePricesPipe } from 'src/common/interceptors/swagger-array-convertions.interface';
import { PriceDto } from 'src/modules/price/dto/create-price.dto';

@UsePipes(new ParsePricesPipe())
export class CreateProductDto {
  @ApiProperty({ description: 'Tên sản phẩm', required: false })
  @IsString()
  readonly name: string;

  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({ description: 'Giá gốc sản phẩm', required: false })
  @IsNumber()
  readonly price_original: number;

  @ApiProperty({ description: 'Giá mới sản phẩm', required: false })
  @IsNumber()
  readonly price_new: number;

  @ApiProperty({ description: 'Trạng thái xuất bản sản phẩm', required: false })
  @IsOptional()
  @IsBoolean()
  readonly isPublished?: boolean = false;

  @ApiProperty({ description: 'Số lượng tồn kho', required: false })
  @IsNumber()
  @IsOptional()
  readonly quantityInStock?: number = 0;

  @ApiProperty({ description: 'Số lượng sản phẩm', required: false })
  @IsNumber()
  readonly quantity?: number;

  @ApiProperty({ description: 'Mảng ID của danh mục', type: 'array', items: { type: 'string' }, required: false })
  @IsNotEmpty()
  @IsArray()
  @IsMongoId({ each: true })
  category_id: string[];

  @ApiProperty({ description: 'Tên danh mục', type: 'array', items: { type: 'string' }, required: false })
  @IsString({ each: true })
  readonly categoryName: string[];

  @ApiProperty({
    description: 'Mảng các giá sản phẩm tương ứng với các kích thước khác nhau',
    type: [PriceDto],
    isArray: true,
    required: false
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PriceDto)
  prices: PriceDto[];
  
  files: Array<Express.Multer.File>
}
