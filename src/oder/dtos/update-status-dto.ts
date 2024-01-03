import { IsEnum } from 'class-validator';
import { OrderStatus } from '../order.model';

export class updateStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
