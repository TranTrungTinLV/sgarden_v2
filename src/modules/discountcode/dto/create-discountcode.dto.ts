import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean,IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDiscountcodeDto {
    @ApiProperty({description: 'nhập mã code khách hàng'})
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({description: 'ngày hết hạn'})
    @IsDate()
    @IsOptional()
    valid_to: Date;

    @ApiProperty({description: 'kiểm tra đã dùng hay chưa'})
    @IsBoolean()
    @IsOptional()
    isUsed: boolean;

    @ApiProperty({description: 'giảm giá'})
    @IsNumber()
    @IsOptional()
    discount: number;
}
