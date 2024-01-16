// // customer_id
// // products
// // total_price
// // type
// // QRCode
// // payment_status

// import { IsEmpty, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
// import { OrderStatus, Types } from '../schema/oder.schema';
// import { User } from 'src/auth/schema/auth.schema';
// export class oderDto {
//   // readonly products: {
//   //   product_id: string;
//   //   quantity: number;
//   //   size: string;
//   // }[];

//   @IsNotEmpty()
//   @IsEnum(Types, { message: 'Please enter correct types.' })
//   readonly type: Types.DELIVERY;


//   readonly payment_status: OrderStatus;

//   // readonly QRCode: string;

//   readonly customer_id: string;

//   readonly total_price: string;
  
//   @IsNotEmpty()
//   @IsNumber()
//   readonly total_pay: number;

//   @IsEmpty({ message: 'You cannot pass user id' })
//   readonly user: User;
// }

// export class UpdateOrderDto {
//   @IsEnum(['pending', 'confirm'])
//   payment_status: string;
// }
