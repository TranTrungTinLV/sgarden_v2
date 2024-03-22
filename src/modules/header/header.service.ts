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
        const newFooter = this.FooterModel.create(createFooterDto)
        return await newFooter;
    }
}


