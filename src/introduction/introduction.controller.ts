import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IntroductionService } from './introduction.service';
import { Introduction } from './schema/introduction.shcema';
import { IntroductionDto } from './dto/create-introdution';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiSecurity('bearerAuth')
@ApiTags('Introduction')
@Controller('introduction')
export class IntroductionController {
  constructor(private introductionService: IntroductionService) {}
  @Get()
  async getAll(): Promise<Introduction[]> {
    return this.introductionService.findAll();
  }
  @Get(':id')
  async getTaskId(@Param('id') id: string): Promise<Introduction> {
    return this.introductionService.findbyId(id);
  }
  @Post()
  async createIntroduction(
    @Body() introduction: IntroductionDto,
  ): Promise<Introduction> {
    return this.introductionService.create(introduction);
  }
}
