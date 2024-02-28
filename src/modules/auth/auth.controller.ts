import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decators/roles.decorator';
import { Public } from 'src/common/decorators/public.decorations';
import { Role } from 'src/modules/users/schema/users.schema';
import { UsersService } from 'src/modules/users/users.service';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { RolesGuard } from 'src/common/guard/roles.gaurd';
import { Response } from 'express';

@ApiTags('Auth')
@UseGuards(RolesGuard)
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
  
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req: any) {
    return req.user
  }

  @Roles(Roles[Role.Admin])
  @Get('users')
  getAll(){
    return this.userService.findAll()
  }
  @Roles(Roles[Role.Admin])
  @Get()
  getFilter(@Query('keyword') keyword:string){
    return this.userService.findWithFilter(keyword)
  }
}
