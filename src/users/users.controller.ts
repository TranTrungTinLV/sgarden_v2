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
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user-dto';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { UserDto } from './dtos/users-dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user-dto';
// import { AuthGuard } from 'src/guards/auth.guard';

import { User } from './users.entity';
import { CurrentUser } from './decorator/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
// import { CurrentUserInterceptor } from './decorator/current-user.decorator';
@Controller('users')
// @Serialize(UserDto)
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
    // @Session() session: any,
  ): Promise<{ accessToken: string; user: User }> {
    console.log('signinUser - Received body:', body);
    // const user = await this.authService.signin(body.email, body.password);
    const token = await this.authService.signin(body);
    // session.userId = token.user.id;
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
    const user = await this.userService.findBySlug(slug);
    if (!user) {
      throw new NotFoundException('user not found haha');
    }
    return user;
  }

  @Get()
  @UseGuards(AuthGuard())
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
  @Get('whoami')
  @UseGuards(AuthGuard())
  async whoAmI(@CurrentUser() user: User) {
    return user;
  }
  // @Post(':slug/forgotPassword')
  // async forgotPassword(@Body() emai: string){
  //    this.forgotPassword(@Body()(new ValidationPipe())){

  //   }
  // }
}
