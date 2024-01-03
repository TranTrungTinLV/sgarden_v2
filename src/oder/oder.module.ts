import { Module } from '@nestjs/common';
import { OderController } from './oder.controller';
import { OderService } from './oder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './oder.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), UsersModule],
  controllers: [OderController],
  providers: [OderService],
})
export class OderModule {}
