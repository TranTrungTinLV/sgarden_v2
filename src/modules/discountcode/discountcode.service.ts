import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { parse, isValid } from 'date-fns';

import { CreateDiscountcodeDto } from './dto/create-discountcode.dto';
import { DiscountCode } from './schema/discountcode.schema';
import { UpdateDiscountcodeDto } from './dto/update-discountcode.dto';
// import { UpdateDiscountcodeDto } from './dto/update-discountcode.dto';

@Injectable()
export class DiscountcodeService {
  constructor(
    @InjectModel(DiscountCode.name) private readonly disCountModel: Model<DiscountCode>
  ){}

  async create(createDiscountDto: CreateDiscountcodeDto): Promise<DiscountCode> {
    let validToDate;
    if (createDiscountDto.valid_to) {
      
      validToDate = parse(createDiscountDto.valid_to, "yyyy-MM-dd", new Date());
      
      
      if (!isValid(validToDate)) {
        validToDate = parse(createDiscountDto.valid_to, "dd/MM/yyyy", new Date());
      }
      
      
      if (!isValid(validToDate)) {
        throw new BadRequestException('Ngày "valid_to" không hợp lệ.');
      }
    }
  
    const newDiscountCode = new this.disCountModel({
      ...createDiscountDto,
      valid_to: validToDate
    });
  
    return newDiscountCode.save();
  }

  async updateDiscountCode(id:string,updateDiscountCode: UpdateDiscountcodeDto): Promise<DiscountCode> {
    const discountCode = await this.disCountModel.findById(id);
    if(!discountCode){
      throw new NotFoundException(`Không tìm thấy ${discountCode} để chỉnh sửa`)
    }
    // Xử lý trường valid_to nếu được cung cấp
    if (updateDiscountCode.valid_to) {
      let validToDate = parse(updateDiscountCode.valid_to, "yyyy-MM-dd", new Date());
      
      if (!isValid(validToDate)) {
        validToDate = parse(updateDiscountCode.valid_to, "dd/MM/yyyy", new Date());
      }
      
      if (!isValid(validToDate)) {
        throw new BadRequestException('Ngày "valid_to" không hợp lệ.');
      }

      // Cập nhật trường valid_to với giá trị đã chuyển đổi
      discountCode.valid_to = validToDate;
    }

    Object.entries(updateDiscountCode).forEach(([key, value]) => {
      if (key !== 'valid_to' && value !== undefined && value !== '') {
        discountCode[key] = value;
      }
    });
    return discountCode
  }
  
  //Áp dụng khi order
  async validateDiscountCode(code: string): Promise<DiscountCode> {
    const discountCode = await this.disCountModel.findOne({code:code}).exec();
    console.log("mã giảm giá",discountCode)
    if(!discountCode) {
      throw new NotFoundException(`Discount code ${code} không tồn tại`)
    }
    const now = new Date();
    
    const validToDate = new Date(discountCode.valid_to);
    validToDate.setHours(23, 59, 59, 999);// Set thời gian đến 24:00

    if(discountCode.isUsed || discountCode.valid_to < now) {
      throw new NotFoundException(`Mã ${code} hết hạn`)
    }
    return discountCode
  }




  
}
