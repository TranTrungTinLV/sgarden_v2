import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsMongoId } from 'class-validator';

import { OrderStatus, Type } from '../schema/oder.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/modules/product/schema/product.schema';

export class ProductOrderDto {
  // [x: string]: any;
  productId: string;
  size: string; // Thêm trường này để lưu kích cỡ sản phẩm
  quantity: number;
}

export class oderDto {
  readonly slug: string;
  @IsString()
  @IsOptional()
  readonly type: Type.DELIVERY;

  @IsString()
  @IsOptional()
  readonly payment_status: OrderStatus.PENDING;

  @IsString()
  readonly QRCode: string;

  // @IsNotEmpty()
  @IsNumber()
   total_price: number;


  @IsNumber()
  readonly total_pay: number;

  @ApiProperty({ example: ['productId1', 'productId2'], description: 'Danh sách sản phẩm', type: [String] })
  @IsNotEmpty()
  @IsArray()
  @IsMongoId({ each: true })
  products: ProductOrderDto[];

  
  @ApiProperty({ example: 2, description: 'Số lượng', required: false })
  @IsNumber()
  readonly quantity?: number;


  @ApiProperty({ example: 'sgarden_2025', description: 'Mã giảm giá nếu có không thì thôi', required: false })
  @IsString()
  @IsOptional()
  readonly discountCode: string;

  @IsString()
  readonly size?: string// M, L, hoặc N (not set)
}
