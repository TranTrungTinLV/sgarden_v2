import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderStatus, Type } from '../schema/oder.schema';

export class oderDto {
  @IsString()
  @IsOptional()
  readonly type: Type.DELIVERY;

  @IsString()
  @IsOptional()
  readonly payment_status: OrderStatus.PENDING;

  // readonly QRCode: string;

  @IsNotEmpty()
  @IsNumber()
  readonly total_price: number;

  @IsNotEmpty()
  @IsNumber()
  readonly total_pay: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
//   @Each(IsString())
  products: string[];
}
