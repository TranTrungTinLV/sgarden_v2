import { Module } from '@nestjs/common';
import { FooterService } from './footer.service';
import { HeaderController } from './footer.controller';
import { MongooseModule } from '@nestjs/mongoose';
// import { HeaderSchema } from './schema/footer.schema';
import { UsersModule } from 'src/modules/users/users.module';
import { FooterSchema } from './schema/footer.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: 'Footer',schema: FooterSchema}]),UsersModule],
  controllers: [HeaderController],
  providers: [FooterService],
})
export class FooterModule {}
