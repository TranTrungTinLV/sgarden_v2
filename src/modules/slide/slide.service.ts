import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateSlideDto } from './dtos/slide-dto';
import { Slide } from './schema/slide-schema';

@Injectable()
export class SlideService {
    constructor(
        @InjectModel(Slide.name) private readonly slideModel: Model<Slide>
    ){}

    //create slide
    async create(createSlideDto: CreateSlideDto): Promise<Slide>{
        const newSlide = await this.slideModel.create(createSlideDto)
        return newSlide
    }
    //get slide
    async getAllSlide(): Promise<Slide[]>{
        const slide = await this.slideModel.find();
        return slide
    }

    //update slide
    async updateSlide(slideId: string,updateSlideDto: CreateSlideDto): Promise<Slide>{
        const slide = await this.slideModel.findById(slideId);
        if(!slide){
            throw new NotFoundException(`Không tìm thầy ${slide} để chỉnh sửa`)
        }
        //update Slide
        slide.title = updateSlideDto.title
        slide.image = updateSlideDto.image
        slide.detail = updateSlideDto.detail
        slide.navigate_link = updateSlideDto.navigate_link
        return slide.save();
    }

    //delete slide
    async deleteSlide(slideId: string): Promise<any> {
        const slide = await this.slideModel.findById(slideId)
        if(!slide){
            throw new NotFoundException(`Không tìm thấy ${slide} để xóa`)
        }
        const result = await this.slideModel.deleteOne({_id: slideId})
        if(result.deletedCount === 0) {
            throw new NotFoundException(`Không tìm thấy ${slideId} để xóa`)
          }
        
          return slide;
    }
}
