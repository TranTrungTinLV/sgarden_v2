import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dtos/create-user-dto';
import { v4 } from 'uuid';
import { LoginUserDto } from './dtos/login-user-dto';
import { ForgotPasswordDto } from './dtos/users-forgotpassword';
import { JwtPayload } from './dtos/jwt-payload-interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService,
  ) {}
  genergateId(): string {
    return v4().split('-')[0];
  }
  async signup(createUserDto: CreateUserDto) {
    const { email, password, sex, birthday, phone, username } = createUserDto;
    // See if email is in use
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('Email ton tai');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');
    // const createUserDto: CreateUserDto = {
    //   email,
    //   password: result,
    //   slug: '', // generate slug value
    //   username: '', //choose username
    //   sex: '', // 'male' or 'female'
    //   birthday: '',
    //   phone: '', // user's phone number
    // };
    const user = await this.userService.create({
      password: result,
      username,
      email,
      sex,
      birthday,
      phone,
      slug: this.genergateId(),
    });

    return user;
  }

  async signin(
    loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string; user: User }> {
    const { email, password } = loginUserDto;

    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    // const user1 = await this.repo.findOne({where:{email}});
    // if (user) {
    const payload: JwtPayload = { email };
    const accessToken: string = await this.jwtService.sign(payload);
    console.log(accessToken);
    return { user, accessToken };
    // } else {
    //   throw new UnauthorizedException('Please check your login credentials');
    // }
  }
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userService.find(forgotPasswordDto.email);
    if (!user) {
      throw new BadRequestException('Invalid email');
    }
  }
}
