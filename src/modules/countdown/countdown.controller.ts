import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBody, ApiConsumes, ApiOperation, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/common/decators/roles.decorator";
import { Public } from "src/common/decorators/public.decorations";
import { RolesGuard } from "src/common/guard/roles.gaurd";

import { Role } from "../users/schema/users.schema";
import { CountdownService } from "./countdown.service";
import { CountDownDto } from "./dtos/countdown.dto";
import { CountDownEvent } from "./schema/countdown.schema";
import { multerOptions } from "src/utils/uploadImage";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiSecurity('bearerAuth')
@ApiTags('CountDown')
@UseGuards(RolesGuard)
@Controller('countdown')
export class CountdownController {
    constructor(
        private readonly countdownEventService: CountdownService
    ){}

  @ApiOperation({ summary: 'tạo sự kiện', description: 'Yêu cầu role: Admin' })
  @Post()
  @Roles([Role.Admin])
  @UseInterceptors(FileInterceptor('image',multerOptions('countdown')))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {type: 'string'},
        time_countdown: {type: 'string'},
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  create(@Body() createCountDownEvent: CountDownDto, @UploadedFile() file: Express.Multer.File): Promise<CountDownEvent> {
    if(file){
      createCountDownEvent.image = `/images/countdown/${file.filename}`
      console.log(file)
      console.log("ok")
    }
    return this.countdownEventService.create(createCountDownEvent)
  }

  @Put(':countdownId')
  @Roles([Role.Admin])
  @UseInterceptors(FileInterceptor('image',multerOptions('countdown')))
  async updateCountDown(@Param('countdownId') countdownId: string, @Body() updateCountDownDto: CountDownDto){
    return await this.countdownEventService.update(countdownId,updateCountDownDto)
  }
  

  // phía user
  @Get('/show')
  @ApiOperation({ summary: 'lấy sự kiện đếm ngược đang hiển thị', description: 'All' })
  
  @Public()
  async findEventsToShow(): Promise<CountDownEvent[]> {
    return this.countdownEventService.findEventsToShow()
  }

  // phía user
  @Get('/')
  @Public()
  @ApiOperation({ summary: 'lấy hết sự kiện', description: 'All' })
  async getAllEvent(): Promise<CountDownEvent[]> {
    return this.countdownEventService.findAllEvents()
  }
}
