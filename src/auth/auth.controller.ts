import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup-dto';
import { LoginDto } from './dto/login-dto';
import { ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
// import { storageConfig } from 'src/ultils/apiFeatures';
import { User } from '../users/schema/users.schema';
import { Public } from 'src/common/decorators/public.decorations';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // @Post('/signup')
  // SignUp(@Body() signUpDto: SignupDto): Promise<{ token: string }> {
  //   return this.authService.signUp(signUpDto);
  // }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto.username, loginDto.password);
  }

  // @Put('upload/:id')
  // @UseInterceptors(AnyFilesInterceptor({ storage: storageConfig(`files`) }))
  // async uploadFiles(
  //   @Param('id') id: string,
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  // ) {
  //   console.log(id);
  //   console.log(files);
  // }
}
