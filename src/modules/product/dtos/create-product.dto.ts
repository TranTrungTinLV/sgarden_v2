import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional,IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateProductDto {

  @ApiProperty({ description: 'Tên sản phẩm' })
  @IsString()
  readonly name: string;


  @ApiProperty({ description: 'Mảng các hình ảnh sản phẩm', type: [mongoose.Schema.Types.String] })
  // @IsArray()
  // @IsMongoId({ each: true })
  images?: string[]; // Đã thêm trở lại và sử dụng `IsString({ each: true })` để kiểm tra từng phần tử trong mảng

  @ApiProperty({ description: 'Giá gốc sản phẩm' })
  @IsNumber()
  readonly price_original: number;

  @ApiProperty({ description: 'Giá mới sản phẩm' })
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

  @ApiProperty({ description: 'Số lượng sản phẩm' })
  @IsNumber()
  readonly quantity?:number;

  @IsNotEmpty()
  @IsArray()
  @IsMongoId({ each: true })
  category_id: string[]; // Thêm trường này

  // @ApiProperty({ description: 'Tên danh mục', type: [String] })
  @IsString()
  readonly categoryName: string[]; // Thêm trường này
}
