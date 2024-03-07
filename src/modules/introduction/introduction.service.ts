import { Injectable, NotFoundException } from "@nestjs/common";
import { Introduction } from './schema/introduction.shcema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IntroductionDto } from "./dto/create-introdution";

@Injectable()
export class IntroductionService {
  constructor(
    @InjectModel(Introduction.name)
    private IntroductionModel: mongoose.Model<Introduction>,
  ) {}

  async findAll(): Promise<Introduction[]> {
    const introduction = await this.IntroductionModel.find();
    return introduction;
  }

  async findbyId(id: string): Promise<Introduction> {
    try{
      const introduction = await this.IntroductionModel.findById(id);
      if (!introduction) {
        throw new NotFoundException(`Not found`);
      }
      return introduction;
    } catch (error) {
      throw new NotFoundException(`Not found`, error);
    }
  }

  async createOrUpdate(introductionData: IntroductionDto): Promise<Introduction> {
    const existingIntroduction = await this.IntroductionModel.findOne();
    if (existingIntroduction) {
      // Cập nhật bài viết giới thiệu hiện tại
      const updatedIntroduction = await this.IntroductionModel.findByIdAndUpdate(existingIntroduction._id, introductionData, { new: true });
      return updatedIntroduction;
    } else {
      // Nếu không tìm thấy bài viết giới thiệu nào, tạo mới
      // Đảm bảo chỉ tạo mới khi không có bài viết nào tồn tại
      const count = await this.IntroductionModel.countDocuments();
      if (count === 0) {
        const newIntroduction = await this.IntroductionModel.create(introductionData);
        return newIntroduction;
      } else {
        throw new Error('Đã tồn tại bài viết giới thiệu, không thể tạo thêm.');
      }
    }
  }
  async updateIntroduction(id:string, updateIntroductionDto: IntroductionDto): Promise<Introduction>{
    const introduction = await this.IntroductionModel.findById(id);
    if(!introduction){
      throw new NotFoundException(`Không tìm thấy ID ${introduction} để chỉnh sửa`)
    }
    //update introduction
    introduction.title = updateIntroductionDto.title;
    introduction.image = updateIntroductionDto.image;
    introduction.content = updateIntroductionDto.content;

    return introduction.save()
    
  }
}
