import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class FooterDto { 
    @ApiProperty({
        description: 'logo',
        required:true   
    })
    @IsString({})
    logo?:string

    @ApiProperty({
        description: 'số điện thoại',
        required: true
    })
    phone?:string

    @ApiProperty({
        description: 'địa chỉ',
        required: true
    })
    address:string
}