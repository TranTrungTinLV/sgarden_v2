import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, IsMongoId } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString({ each: true })
  readonly images?: string[];

  @IsOptional()
  @IsNumber()
  readonly price_original?: number;

  @IsOptional()
  @IsNumber()
  readonly price_new?: number;

  @IsOptional()
  @IsBoolean()
  readonly isPublished?: boolean;

  @IsOptional()
  @IsNumber()
  readonly quantityInStock?: number;

  @IsOptional()
  @IsNumber()
  readonly quantity?: number;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly category_id?: string[];

  @IsOptional()
  @IsString()
  readonly categoryName?: string;
}