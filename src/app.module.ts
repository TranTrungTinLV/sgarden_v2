import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { CategoryModule } from './category/category.module';
import { CategoryEntity } from './category/category.entity';
import { OderModule } from './oder/oder.module';
import { Order } from './oder/oder.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      database: 'sgarden',
      port: 27017,
      host: '127.0.0.1',
      entities: [User, Product, CategoryEntity, Order],
      synchronize: true,
    }),
    ProductModule,
    CategoryModule,
    OderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
