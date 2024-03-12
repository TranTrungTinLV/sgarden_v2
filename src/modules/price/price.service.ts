import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Price } from './schema/price.schema';
import { PriceDto } from './dto/create-price.dto';

@Injectable()
export class PriceService {
    constructor(
        @InjectModel(Price.name) private readonly priceModel: Model<Price>
    ){}
    
    async create(createPriceDto: PriceDto):Promise<Price>{
        const newPrice =   this.priceModel.create(createPriceDto)
        return newPrice
    }

}
