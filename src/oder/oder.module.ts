import { Module } from '@nestjs/common';
import { OderController } from './oder.controller';
import { OrderService } from './oder.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OderSchema } from './schema/oder.schema';
import { UsersModule } from 'src/users/users.module';
import { UserSchema } from 'src/users/schema/users.schema';
import { ProductSchema } from 'src/product/schema/product.schema';

@Module({
  imports: [
    UsersModule,
    // ProductModule,
    MongooseModule.forFeature([
      {
        name: 'Order',
        schema: OderSchema,
      },
      { name: 'User', schema: UserSchema },
      { name: 'Product', schema: ProductSchema },
    ]),
  ],
  controllers: [OderController],
  providers: [OrderService],
})
export class OderModule {}
