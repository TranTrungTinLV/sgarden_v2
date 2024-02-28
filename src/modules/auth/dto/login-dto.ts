import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
