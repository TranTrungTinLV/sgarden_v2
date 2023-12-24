import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  slug: string;
  @IsString({
    message: 'Vui long nhap password',
  })
  password: string;
  @IsEmail(
    {},
    {
      message: 'Vui long nhap email',
    },
  )
  email?: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
}
