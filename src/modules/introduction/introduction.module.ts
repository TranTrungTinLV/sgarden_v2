import { Module } from '@nestjs/common';
import { IntroductionController } from './introduction.controller';
import { IntroductionService } from './introduction.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IntroductionShcema } from './schema/introduction.shcema';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Introduction',
        schema: IntroductionShcema,
      },
    ]),
  ],
  controllers: [IntroductionController],
  providers: [IntroductionService],
})
export class IntroductionModule {}
