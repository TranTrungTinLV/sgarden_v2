import { Test, TestingModule } from '@nestjs/testing';
import { SlideShowService } from './slide-show.service';

describe('SlideShowService', () => {
  let service: SlideShowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlideShowService],
    }).compile();

    service = module.get<SlideShowService>(SlideShowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
