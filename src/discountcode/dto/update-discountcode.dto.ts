import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDiscountcodeDto {
    @IsString()
    @IsNotEmpty()
    code?: string;

    @IsDate()
    @IsOptional()
    valid_to?: Date;

    @IsBoolean()
    @IsOptional()
    isUsed?: boolean;

    @IsNumber()
    @IsOptional()
    discount?: number;
}
