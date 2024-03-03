import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/common/decators/roles.decorator";
import { Public } from "src/common/decorators/public.decorations";
import { RolesGuard } from "src/common/guard/roles.gaurd";

import { Role } from "../users/schema/users.schema";
import { CountdownService } from "./countdown.service";
import { CountDownDto } from "./dtos/countdown.dto";
import { CountDownEvent } from "./schema/countdown.schema";

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
  create(@Body() createCountDownEvent: CountDownDto){
    return this.countdownEventService.create(createCountDownEvent)
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
