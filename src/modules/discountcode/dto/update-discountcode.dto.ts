import { BadRequestException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, validate } from "class-validator";

export class UpdateDiscountcodeDto {
    @ApiProperty({ description: 'Nhập mã code khách hàng' })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({ description: 'Ngày hết hạn', required: false, example: '2024-03-27 hoặc 27/03/2024' })
    @IsString()
    valid_to?: string;

}
