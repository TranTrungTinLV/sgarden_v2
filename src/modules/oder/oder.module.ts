import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscountcodeModule } from 'src/modules/discountcode/discountcode.module';
import { DiscountcodeSchema } from 'src/modules/discountcode/schema/discountcode.schema';
import { LevelMemberModule } from 'src/modules/level-member/level-member.module';
import { LevelMemberSchema } from 'src/modules/level-member/schema/levelMember.schema';
import { ProductSchema } from 'src/modules/product/schema/product.schema';
import { UserSchema } from 'src/modules/users/schema/users.schema';
import { UsersModule } from 'src/modules/users/users.module';

import { OderController } from './oder.controller';
import { OrderService } from './oder.service';
import { OderSchema } from './schema/oder.schema';
import { ProductModule } from 'src/modules/product/product.module';

@Module({
  imports: [
    UsersModule,
    ProductModule,
    DiscountcodeModule,
    LevelMemberModule,
    MongooseModule.forFeature([
      {
        name: 'Order',
        schema: OderSchema,
      },
      { name: 'User', schema: UserSchema },
      { name: 'Product', schema: ProductSchema },
      {name: 'DiscountCode', schema: DiscountcodeSchema},
      {name: 'LevelMember',schema: LevelMemberSchema}
    ]),
  ],
  controllers: [OderController],
  providers: [OrderService],
})
export class OderModule {}