import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional,IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name: string;


  @IsString({ each: true })
  readonly images?: string[]; // Đã thêm trở lại và sử dụng `IsString({ each: true })` để kiểm tra từng phần tử trong mảng

  @IsNumber()
  readonly price_original: number;

  @IsNumber()
  readonly price_new: number;

  @IsOptional()
  @IsBoolean()
  readonly isPublished?: boolean = false;

  @IsOptional()
  readonly image?: any;

  @IsNumber()
  @IsOptional()
  readonly quantityInStock?: number = 0;

  @IsNumber()
  readonly quantity?:number;

  @IsNotEmpty()
  @IsArray()
  @IsMongoId({ each: true })
  category_id: string[]; // Thêm trường này

  @IsString()
  readonly categoryName: string[]; // Thêm trường này
}
