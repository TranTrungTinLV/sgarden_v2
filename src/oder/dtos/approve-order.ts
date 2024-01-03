import { IsBoolean } from 'class-validator';

export class ApproveOrderDto {
  @IsBoolean()
  approved: boolean;
}
