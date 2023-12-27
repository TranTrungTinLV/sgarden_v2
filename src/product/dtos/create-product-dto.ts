import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { Category } from '../product.models';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phoneNo: number;

  @IsNotEmpty()
  address: string;

  @IsEnum(Category)
  category: Category;

  images?: object[];

  @IsNotEmpty()
  location: {
    type: 'Point';
    coordinates: number[];
  };
}