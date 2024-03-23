import { Injectable, NotFoundException } from "@nestjs/common";
import { Slide } from "./schema/slide-schema";
import { Slideshow } from "../slide-show/schema/slideShow-schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateSlideDto } from "./dtos/slide-dto";

@Injectable()
export class SlideService {
  constructor(
    @InjectModel(Slide.name) private slideModel: Model<Slide>,
    @InjectModel(Slideshow.name) private slideshowModel: Model<Slideshow> // Sử dụng Model<Slideshow> ở đây
  ) {}

  async createSlide(createSlideDto: CreateSlideDto): Promise<Slide> {
    const newSlide = new this.slideModel(createSlideDto);
    await newSlide.save();

    await this.slideshowModel.updateMany(
      { is_show: createSlideDto.is_show },
      { $push: { slides: newSlide._id } }
    )
    return newSlide;
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
          await this.slideshowModel.updateMany(
            { slides: slideId },
            { $pull: { slides: slideId } }
          ).exec();

          return slide;
    }
  //get slide
  async getAllSlide(): Promise<Slide[]>{
    const slide = await this.slideModel.find();
    return slide
}
}