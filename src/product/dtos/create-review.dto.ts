import {
  IsNotEmpty,
  IsNumber,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt({ message: 'Rate must be an integer' })
  @Min(1, { message: 'Rate must be at least 1' })
  @Max(5, { message: 'Rate must be at most 5' })
  star: number;

  @IsString()
  @IsOptional()
  content: string;
}
