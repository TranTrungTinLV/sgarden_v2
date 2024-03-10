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
    const savedSlide = await newSlide.save();

    if (createSlideDto.slideshowId) {
      const slideshow = await this.slideshowModel.findById(createSlideDto.slideshowId).exec();
      if (!slideshow) {
        throw new NotFoundException(`Slideshow with ID ${createSlideDto.slideshowId} not found`);
      }
      slideshow.slides.push(savedSlide._id); // TypeScript nên hiểu thuộc tính 'slides' ở đây
      await slideshow.save();
    }

    return savedSlide;
  }
}