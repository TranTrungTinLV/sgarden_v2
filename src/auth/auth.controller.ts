import { Body, Controller, HttpCode, HttpStatus, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decators/roles.decorator';
import { Public } from 'src/common/decorators/public.decorations';
import { Role } from 'src/users/schema/users.schema';
import { UsersService } from 'src/users/users.service';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UsersService
    ) {}

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Login successful' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto.username, loginDto.password);
  }

  // @Patch(':userId/score')
  // @Roles([Role.Admin,Role.Staff])
  // async updateMemberPoints(
  //   @Param('userId') userId: string,
  //   @Body('score') points: number
  // ) {
  //   // return this.userService.updateMemberPoints(userId,points)
  // }

  @Public()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiProperty({
    description: 'Đăng xuất'
  })
  async logout(@Req() request: any) {
    return { message: 'Logout successful' };
  }

  @Public()
  @Post('forgot-password')
  @ApiProperty({
    description: 'Quên mật khẩu'
  })
  async forgotPassword(@Body('email') email: string) {
    await this.authService.forgotPassword(email);
    return { message: 'Reset password link sent if email exists' };
  }

  @Public()
  @ApiProperty({
    description: 'cập nhật mật khẩu'
  })
  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string
  ) {
    await this.authService.resetPassword(token, newPassword);
    return { message: 'Password reset successfully' };
  }

}
