import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly category_id: string; // Đã thêm trở lại

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
}
