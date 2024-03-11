import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OderSchema } from 'src/modules/oder/schema/oder.schema';
import { UsersModule } from 'src/modules/users/users.module';

import { DiscountcodeController } from './discountcode.controller';
import { DiscountcodeService } from './discountcode.service';
import { DiscountcodeSchema } from './schema/discountcode.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
    [
      {
    name: 'DiscountCode',
    schema: DiscountcodeSchema
  },
  {
    name: 'Order',
    schema: OderSchema
  },
]),
UsersModule

],
controllers: [DiscountcodeController],
  providers: [DiscountcodeService],
  exports: [DiscountcodeService]
})
export class DiscountcodeModule {}
