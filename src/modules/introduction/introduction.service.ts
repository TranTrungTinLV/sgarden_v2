import { Injectable, NotFoundException } from "@nestjs/common";
import { Introduction } from './schema/introduction.shcema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

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

  async create(introduction: Introduction): Promise<Introduction> {
    const res = await this.IntroductionModel.create(introduction);
    return res;
  }
}
