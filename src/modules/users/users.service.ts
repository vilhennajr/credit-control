import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: { name: string; email: string }) {
    try {
      const user = this.usersRepository.create(createUserDto);
      return this.usersRepository.save(user);
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return this.usersRepository.findOneBy({ id });
    } catch (err) {
      throw err;
    }
  }
}
