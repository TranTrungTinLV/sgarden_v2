import { Body, NotFoundException, Post } from '@nestjs/common';
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

   async create(createCountdownEventDto: CountDownDto):Promise<CountDownEvent>{
        if(createCountdownEventDto.is_show = true){
           await this.countdownEventModel.updateMany({},{is_show: false})
           const newEvent = this.countdownEventModel.create(createCountdownEventDto);
          return newEvent;
        }else{
          const newEvent = this.countdownEventModel.create(createCountdownEventDto);
          return newEvent;
        }
        
    }
    async update(countdownId: string,updateCountDown: CountDownDto ){
      const countdown = await this.countdownEventModel.findById(countdownId);
      if(!countdown){
        throw new NotFoundException(`Không tìm thấy ID ${countdown} để thực hiện việc sửa sự kiện`)
      }

      //update feild
      countdown.title = updateCountDown.title
      countdown.time_countdown = updateCountDown.time_countdown
      countdown.is_show = updateCountDown.is_show
      countdown.navigate_link = updateCountDown.navigate_link
      countdown.image = updateCountDown.image
      return countdown.save();
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
