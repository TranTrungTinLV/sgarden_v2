import { IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  //   readonly category_id: string;
  //   readonly images: string[];

  readonly price_original: number;

  readonly price_new: number;

  // readonly reviews: ReviewDto[];

  readonly isPublished?: boolean = false;

  readonly image?: any;
}
