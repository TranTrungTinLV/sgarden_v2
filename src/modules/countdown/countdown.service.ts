import { Body, Post } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CountDownDto } from './dtos/countdown.dto';
import { CountDownEvent } from './schema/countdown.schema';
@Injectable()
export class CountdownService {
    constructor(
        @InjectModel(CountDownEvent.name) private countdownEventModel: Model<CountDownEvent>
    ){}
    @Post()
    create(@Body() createCountdownEventDto: CountDownDto):Promise<CountDownEvent>{
        const newEvent = this.countdownEventModel.create(createCountdownEventDto);
        return newEvent;
    }
    // Lấy các CountdownEvent đang hiển thị phụ thuộc vào is_show
  async findEventsToShow(): Promise<CountDownEvent[]> {
    return this.countdownEventModel.find({ is_show: true }).exec();
  }

  // Lấy toàn bộ danh sách CountdownEvent
  async findAllEvents(): Promise<CountDownEvent[]> {
    return this.countdownEventModel.find().exec();
  }
}
