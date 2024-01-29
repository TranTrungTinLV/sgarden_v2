import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OderModule } from 'src/oder/oder.module';
import { OderSchema } from 'src/oder/schema/oder.schema';

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
  
])
],
controllers: [DiscountcodeController],
  providers: [DiscountcodeService],
  exports: [DiscountcodeService]
})
export class DiscountcodeModule {}
