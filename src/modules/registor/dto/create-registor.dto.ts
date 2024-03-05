import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Role } from 'src/modules/users/schema/users.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRegistorDto {
  @IsString()
  readonly slug:string

  @ApiProperty({ example: 'username', description: 'Tên người dùng' })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

 
  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @ApiProperty({ example: 'female or male', description: 'Giới tính', type: Boolean })
  @IsNotEmpty()
  @IsBoolean()
  readonly sex: string;

  @ApiProperty({ example: '08/06/2002', description: 'Ngày sinh' })
  @IsNotEmpty()
  @IsString()
  readonly birthday: string;

  @ApiProperty({ example: '0123456789', description: 'Số điện thoại' })
  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @IsString()
  readonly level_member: string;

  @ApiProperty({ example: 'Full Name', description: 'Tên đầy đủ' })
  @IsNotEmpty()
  @IsString()
  readonly fullname: string;

  @ApiProperty({ example: 'avatar-url', description: 'URL ảnh đại diện', required: false })
  @IsString()
  readonly avatar: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'Mật khẩu (ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường và số hoặc ký tự đặc biệt)',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Passwork to weak',
  })
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly role: string;
}
