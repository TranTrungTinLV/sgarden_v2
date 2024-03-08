import { Test, TestingModule } from '@nestjs/testing';
import { SlideShowController } from './slide-show.controller';
import { SlideShowService } from './slide-show.service';

describe('SlideShowController', () => {
  let controller: SlideShowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlideShowController],
      providers: [SlideShowService],
    }).compile();

    controller = module.get<SlideShowController>(SlideShowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
