import { Module } from '@nestjs/common';
import { DiscountcodeService } from './discountcode.service';
import { DiscountcodeController } from './discountcode.controller';

@Module({
  controllers: [DiscountcodeController],
  providers: [DiscountcodeService],
})
export class DiscountcodeModule {}
