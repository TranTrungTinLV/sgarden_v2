import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dtos/create-user-dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dtos/jwt-payload-interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService,
  ) {}
  //   async create(email: string, password: string) {
  //     const user = await this.repo.create({ email, password });
  //     return this.repo.save(user);
  //   }

  async create(createUserDto: CreateUserDto) {
    const { email, password, sex, slug } = createUserDto;
    try {
      const user = this.repo.create({ email, password, sex, slug });

      return this.repo.save(user);
    } catch (error) {
      return error;
    }
  }

  async findBySlug(slug: string) {
    if (!slug) {
      return null;
    }
    return this.repo.findOneBy({ slug });
  }

  async find(email: string) {
    return this.repo.find({
      where: { email },
    });
  }

  async update(slug: string, attrs: Partial<User>) {
    const user = await this.findBySlug(slug);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async deletebyId(slug: string): Promise<void> {
    const user = await this.repo.findOne({ where: { slug } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // get id
    const id = user.id;

    // call delete with id
    await this.repo.delete(id);
  }
}
