import { Injectable } from '@nestjs/common';
import { CreateDiscountcodeDto } from './dto/create-discountcode.dto';
import { UpdateDiscountcodeDto } from './dto/update-discountcode.dto';

@Injectable()
export class DiscountcodeService {
  create(createDiscountcodeDto: CreateDiscountcodeDto) {
    return 'This action adds a new discountcode';
  }

  findAll() {
    return `This action returns all discountcode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} discountcode`;
  }

  update(id: number, updateDiscountcodeDto: UpdateDiscountcodeDto) {
    return `This action updates a #${id} discountcode`;
  }

  remove(id: number) {
    return `This action removes a #${id} discountcode`;
  }
}
