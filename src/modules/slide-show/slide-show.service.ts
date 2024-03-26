import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Slideshow } from './schema/slideShow-schema';
import { CreateSlideshowDto } from './dtos/slide-show.dto';

@Injectable()
export class SlideShowService {

    constructor(
        @InjectModel(Slideshow.name) private readonly slideShowModel: Model<Slideshow>
    ){}
    

    
    async getVisibleSlideShows(): Promise<Slideshow[]> {
        return this.slideShowModel.find({ is_show: true }).populate('slides').exec();
      }

    async getSlideShowsByVisibility(isShow: boolean): Promise<Slideshow[]> {
      return this.slideShowModel.find({ is_show: isShow }).populate('slides').exec();
  }

    async getVisibleAndInvisibleSlideShows(): Promise<{ visible: Slideshow[], invisible: Slideshow[] }> {
      const visibleSlideShows = await this.getSlideShowsByVisibility(true);
      const invisibleSlideShows = await this.getSlideShowsByVisibility(false);
  
      return {
          visible: visibleSlideShows,
          invisible: invisibleSlideShows
      };
  }
  async filterSlideShowsByVisibility(isShow: boolean): Promise<Slideshow[]> {
    return this.slideShowModel.find({ is_show: isShow }).populate('slides').exec();
}

    async addSlideToSlideShow(slideshowId: string, slideId: string): Promise<Slideshow> {
        return this.slideShowModel.findByIdAndUpdate(
          slideshowId,
          { $addToSet: { slides: slideId } }, // Sử dụng $addToSet để tránh thêm trùng lặp
          { new: true } // Trả về document sau khi cập nhật
        ).populate('slides').exec();
      }

      async createOrUpdateSlideshow(slideshowData: CreateSlideshowDto, slideshowId?: string): Promise<Slideshow> {
        // Nếu slideshowData.is_show là true, kiểm tra xem có Slideshow nào khác có is_show = true hay không
        if (slideshowData.is_show) {
          const existingVisibleSlideshow = await this.slideShowModel.findOne({ is_show: true });
      
          // Nếu tồn tại một Slideshow có is_show = true và không phải là Slideshow hiện tại đang được cập nhật
          if (existingVisibleSlideshow && (!slideshowId || existingVisibleSlideshow._id.toString() !== slideshowId)) {
            throw new UnauthorizedException('Chỉ được phép có một Slideshow duy nhất một is_show');
          }
        }
      
        if (slideshowId) {
          // Logic cập nhật Slideshow nếu slideshowId được cung cấp
          return this.slideShowModel.findByIdAndUpdate(slideshowId, slideshowData, { new: true }).exec();
        } else {
          // Logic tạo Slideshow mới nếu không có slideshowId
          const newSlideshow = new this.slideShowModel(slideshowData);
          return newSlideshow.save();
        }
      }


      

      
      
      
      
    
}
