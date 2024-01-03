import {
  Body,
  Controller,
  Post,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { CreateOderDto } from './dtos/create-order-dto';
import { OderService } from './oder.service';
// import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorator/current-user.decorator';
import { User } from 'src/users/users.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApproveOrderDto } from './dtos/approve-order';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('oders')
@UseGuards(AuthGuard())
export class OderController {
  constructor(private orderService: OderService) {}
  @Post()
  createOders(@Body() body: CreateOderDto, @CurrentUser() user: User) {
    return this.orderService.create(body, user);
  }

  @Patch('/:slug')
  @UseGuards(AdminGuard)
  appprove(@Param('slug') slug: string, @Body() body: ApproveOrderDto) {
    return this.orderService.changeAproval(slug, body.approved);
  }
}
