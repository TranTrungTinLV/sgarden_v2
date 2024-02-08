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
import { Product } from 'src/product/schema/product.schema';

export class oderDto {
  @ApiProperty({description: 'loại đơn hàng'})
  @IsString()
  @IsOptional()
  readonly type: Type.DELIVERY;

  @ApiProperty({description: 'trạng thái thanh toán',required: false})
  @IsString()
  @IsOptional()
  readonly payment_status: OrderStatus.PENDING;

  @ApiProperty({ example: 'QRCodeString', description: 'Mã QR Code' })
  @IsString()
  readonly QRCode: string;

  // @IsNotEmpty()
  @ApiProperty({ example: 100, description: 'Tổng giá tiền' })
  @IsNumber()
   total_price: number;

   @ApiProperty({ example: 100, description: 'Tổng tiền thanh toán', required: false })
  @IsNumber()
  readonly total_pay: number;

  @ApiProperty({ example: ['productId1', 'productId2'], description: 'Danh sách sản phẩm', type: [String] })
  @IsNotEmpty()
  @IsArray()
  @IsMongoId({ each: true })
  products: string[];

  @ApiProperty({ example: 2, description: 'Số lượng', required: false })
  @IsNumber()
  readonly quantity?: number;

  @ApiProperty({ example: 'sgarden_2025', description: 'Mã giảm giá', required: false })
  @IsString()
  @IsOptional()
  readonly discountCode: string;
}
