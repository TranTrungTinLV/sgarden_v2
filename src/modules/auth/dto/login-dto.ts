import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  
  @ApiProperty({description: "Nhập username"})
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({description: "Nhập password"})
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
