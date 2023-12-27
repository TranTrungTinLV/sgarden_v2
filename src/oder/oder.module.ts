import { Module } from '@nestjs/common';
import { OderController } from './oder.controller';
import { OderService } from './oder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Oder } from './oder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Oder])],
  controllers: [OderController],
  providers: [OderService],
})
export class OderModule {}
