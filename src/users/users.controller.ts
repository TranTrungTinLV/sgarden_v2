import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  Session,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user-dto';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { UserDto } from './dtos/users-dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user-dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ForgotPasswordDto } from './dtos/users-forgotpassword';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signinUser(
    @Body() body: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    console.log('signinUser - Received body:', body);
    const token = await this.authService.signin(body);
    console.log('signinUser - Token:', token);
    return token;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  // @UseInterceptors(new Serialize(UserDto))
  @Get(':slug')
  async findUser(@Param('slug') slug: string) {
    console.log('handler is running');
    const user = await this.userService.findId(slug);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  @Get()
  // @UseGuards(AuthGuard)
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete(':slug')
  removeUser(@Param('slug') slug: string): Promise<void> {
    return this.userService.deletebyId(slug);
  }

  @Patch(':slug')
  updateUser(@Param('slug') slug: string, @Body() body: UpdateUserDto) {
    return this.userService.update(slug, body);
  }
  // @Post(':slug/forgotPassword')
  // async forgotPassword(@Body() emai: string){
  //    this.forgotPassword(@Body()(new ValidationPipe())){

  //   }
  // }
}
