import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class FooterDto { 
    @ApiProperty({
        description: 'logo',
        default: true
    })
    @IsString()
    logo:string

    @ApiProperty({
        description: 'số điện thoại',
        default: true
    })
    phone:string

    @ApiProperty({
        description: 'địa chỉ',
        default: true
    })
    address:string

    @ApiProperty({
        description: 'Google Map',
        default: [true,"vui long nhap"]
    })
    maps:string
}