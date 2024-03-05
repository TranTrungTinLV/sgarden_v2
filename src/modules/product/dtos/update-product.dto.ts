import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, IsMongoId } from 'class-validator';

export class UpdateProductDto {
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ each: true })
  readonly images?: string[];

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly price_original?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly price_new?: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly isPublished?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly quantityInStock?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly quantity?: number;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly category_id?: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly categoryName?: string;
}