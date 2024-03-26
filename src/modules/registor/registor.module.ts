import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RegistorService } from './registor.service';
import { RegistorController } from './registor.controller';
import { MongooseModule } from '@nestjs/mongoose';
// import { RegiterSchema } from './schema/registor.schema';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from 'src/modules/users/schema/users.schema';
import { ConfigService } from '@nestjs/config';
import { rateLimitMiddleware } from 'src/utils/rating-limit';
// import { UsersModule } from 'src/users/users.module';
// import { UserSchema } from 'src/users/schema/users.schema';

@Module({
  imports: [
    // UsersModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [RegistorController],
  providers: [RegistorService],
})

export class RegistorModule {}
// export class RegistorModule implements NestModule{
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(rateLimitMiddleware)
//       .forRoutes('register'); // Áp dụng middleware cho route 'register'
//   }
// }
