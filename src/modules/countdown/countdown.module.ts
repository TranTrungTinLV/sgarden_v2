import { Module } from '@nestjs/common';
import { CountdownService } from './countdown.service';
import { CountdownController } from './countdown.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CountDownEventSchema } from './schema/countdown.schema';
import { UsersModule } from '../users/users.module';
import { UserSchema } from '../users/schema/users.schema';


@Module({
  imports: [
    MongooseModule.forFeature(
    [
      {
        name: 'CountDownEvent',
        schema: CountDownEventSchema
      },
      { name: 'User', schema: UserSchema },

    ]
    
  ),
  UsersModule
],
  providers: [CountdownService],
  controllers: [CountdownController]
})
export class CountdownModule {}
