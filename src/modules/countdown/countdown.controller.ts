import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/common/decators/roles.decorator";
import { RolesGuard } from "src/common/guard/roles.gaurd";

import { Role } from "../users/schema/users.schema";
import { CountdownService } from "./countdown.service";
import { CountDownDto } from "./dtos/countdown.dto";
import { CountDownEvent } from "./schema/countdown.schema";
import { Public } from "src/common/decorators/public.decorations";


@UseGuards(RolesGuard)
@Controller('countdown')
export class CountdownController {
    constructor(
        private readonly countdownEventService: CountdownService
    ){}

@Roles([Role.Admin])
  @Post()
  create(@Body() createCountDownEvent: CountDownDto){
    return this.countdownEventService.create(createCountDownEvent)
  }

  // phía user
  @Get('/show')
  @Public()
  async findEventsToShow(): Promise<CountDownEvent[]> {
    return this.countdownEventService.findEventsToShow()
  }

  // phía user
  @Get('/')
  @Public()
  async getAllEvent(): Promise<CountDownEvent[]> {
    return this.countdownEventService.findAllEvents()
  }
}
