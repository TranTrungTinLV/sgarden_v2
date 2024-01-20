import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as crypto from 'crypto';
import { error } from 'console';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  // async signUp(signupDto: SignupDto): Promise<{ token: string; user: User }> {
  //   const {
  //     username,
  //     password,
  //     email,
  //     fullname,
  //     sex,
  //     birthday,
  //     phone,
  //     level_member,
  //     avatar,
  //   } = signupDto;
  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   const user = await this.userModel.create({
  //     username,
  //     password: hashedPassword,
  //     email,
  //     fullname,
  //     sex,
  //     birthday,
  //     phone,
  //     avatar,
  //     level_member,
  //   });
  //   const token = this.jwtService.sign({
  //     id: user._id,
  //   });
  //   return { token, user };
  // }

  async login(username: string, pwd: string) { //đăng nhập
    // const { email, password } = loginDto;

    const user = await this.usersService.findOneWithPassword(username);
    console.log(user)
    const encryptedPassword = crypto
      .createHash('sha256')
      .update(pwd)
      .digest('hex');

    if (user?.password !== encryptedPassword) {
      console.log(HttpStatus);
      throw new UnauthorizedException("lỗi òi");
    }
    // The "sub" (subject) claim identifies the principal that is the subject of the JWT
    const payload = { username: username, sub: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
