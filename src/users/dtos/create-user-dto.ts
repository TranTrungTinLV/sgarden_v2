import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  slug: string;
  @IsString({
    message: 'Vui long nhap username',
  })
  username: string;
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

  // @IsString({
  //     message: 'Vui long nhap gioi tinh',
  // })
  @IsOptional({})
  sex?: string;
  //   @IsString({
  //     message: 'Nhap ngay sinh cua ban',
  //   })
  birthday: string;
  //   @IsString({
  //     message: 'Nhap sdt',
  //   })
  phone: string;
}
