import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  ValidateNested,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
// import { ProductDto } from './product-dto';
import { OrderStatus, Types } from '../order.model';
import { v4 } from 'uuid';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/users.entity';
export class CreateOderDto {
  @Column()
  customer_id: string;
  @Expose()
  slug: string;
  // @ValidateNested({ each: true })
  // @Type(() => ProductDto)
  // products: ProductDto[];

  @IsNumber({}, { message: 'gia tien' })
  total_price: number;

  @IsString()
  @IsOptional()
  discount_code?: string;

  @IsString()
  total_pay: number;

  @Column()
  @IsOptional()
  type?: Types;

  @IsString()
  @IsOptional()
  QRCode?: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column()
  payment_status: OrderStatus;
  // @Column()
  @Column()
  approved?: boolean;
}
