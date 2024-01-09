import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup-dto';
import { LoginDto } from './dto/login-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  SignUp(@Body() signUpDto: SignupDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Get('/login')
  Login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}
