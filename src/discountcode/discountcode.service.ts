import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateDiscountcodeDto } from './dto/create-discountcode.dto';
import { DiscountCode } from './schema/discountcode.schema';

@Injectable()
export class DiscountcodeService {
  constructor(
    @InjectModel(DiscountCode.name) private readonly disCountModel: Model<DiscountCode>
  ){}

  async create(createDiscountDto: CreateDiscountcodeDto): Promise<DiscountCode> {
    const newDiscountCode = new this.disCountModel(createDiscountDto);
    return newDiscountCode.save();
  }

  async validateDiscountCode(code: string): Promise<DiscountCode> {
    const discountCode = await this.disCountModel.findOne({code:code}).exec();
    console.log("mã giảm giá",discountCode)
    if(!discountCode) {
      throw new NotFoundException(`Discount code ${code} không tồn tại`)
    }
    const now = new Date();
    if(discountCode.isUsed || discountCode.valid_to < now) {
      throw new NotFoundException(`Mã ${code} hết hạn`)
    }
    return discountCode
  }
  
}
