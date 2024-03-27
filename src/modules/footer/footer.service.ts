import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Footer } from './schema/footer.schema';
import { FooterDto } from './dtos/create-footer.dto';

@Injectable()
export class FooterService {
    @InjectModel('Footer') private readonly FooterModel: Model<Footer>
    constructor() {
        
    }

    async createFooter(createFooterDto : FooterDto): Promise<Footer> {
        const existingFooter = await this.FooterModel.findOne();
        if(existingFooter) {
            const updateFooter = await this.FooterModel.findByIdAndUpdate(existingFooter,createFooterDto,{new: true});
            Object.entries(createFooterDto).forEach(([key, value]) => {
                if (value !== undefined && value !== '') {
                  existingFooter[key] = value;
                }
              });
            return updateFooter;
        } else {
            const count = await this.FooterModel.countDocuments();
            if(count === 0) {
                const newFooter = await this.FooterModel.create(createFooterDto);
                return newFooter
            } else {
                throw new Error(`Đã tồn tại trường Footer này, không thể tạo thêm`);
            }
        }
    }

    async getFooterInfo(): Promise<Footer> {
        const footerInfo = await this.FooterModel.findOne();
        if (!footerInfo) {
          throw new Error('Footer information is not available.');
        }
        return footerInfo;
      }
}


