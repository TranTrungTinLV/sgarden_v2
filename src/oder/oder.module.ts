import { Module } from '@nestjs/common';
import { OderController } from './oder.controller';
import { OrderService } from './oder.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OderSchema } from './schema/oder.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: 'Order',
        schema: OderSchema,
      },
    ]),
  ],
  controllers: [OderController],
  providers: [OrderService],
})
export class OderModule {}
