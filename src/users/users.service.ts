import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
import { User } from './schema/users.schema';
// import { Repository } from 'typeorm';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: mongoose.Model<User>,
  ) {
    console.log('UserService contructor');
  }

  async findOne(username: string) {
    const user = await this.UserModel.findOne({
      where: { username: username },
      select: { id: true, username: true, role: true },
    });
    return user;
  }

  async findOneWithPassword(username: string) {
    const user = await this.UserModel.findOne({ username });
    return user;
}
}
