import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscountcodeModule } from 'src/discountcode/discountcode.module';
import { DiscountcodeSchema } from 'src/discountcode/schema/discountcode.schema';
import { LevelMemberModule } from 'src/level-member/level-member.module';
import { LevelMemberSchema } from 'src/level-member/schema/levelMember.schema';
import { ProductSchema } from 'src/product/schema/product.schema';
import { UserSchema } from 'src/users/schema/users.schema';
import { UsersModule } from 'src/users/users.module';

import { OderController } from './oder.controller';
import { OrderService } from './oder.service';
import { OderSchema } from './schema/oder.schema';

@Module({
  imports: [
    UsersModule,
    DiscountcodeModule,
    LevelMemberModule,
    // ProductModule,
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
