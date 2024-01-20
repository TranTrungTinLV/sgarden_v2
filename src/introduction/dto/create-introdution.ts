import { IsNotEmpty, IsString } from 'class-validator';

export class IntroductionDto {
  readonly title: string;
  readonly content: string;
  readonly image: string;
}
