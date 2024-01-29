import { PartialType } from '@nestjs/swagger';
import { CreateDiscountcodeDto } from './create-discountcode.dto';

export class UpdateDiscountcodeDto extends PartialType(CreateDiscountcodeDto) {}
