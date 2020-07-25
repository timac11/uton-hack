import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

const SECRET = 'greenRec';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) public readonly userRepository: Repository<User>) {
  }

  static passwordHash(password: string): string {
    return crypto
      .createHmac('sha256', SECRET)
      .update(password)
      .digest('hex');
  }

  public async findByCredentials(email: string, password: string): Promise<User | undefined> {
    const digest = UsersService.passwordHash(password);
    console.log(email, digest);
    return await this.userRepository.findOne({ password: digest, email: email});
  }

  public async save(user: User): Promise<User> {
    user.password = UsersService.passwordHash(user.password);
    return this.userRepository.save(user);
  }

  public async findById(id: number): Promise<User> {
    return this.userRepository.findOne({where: {id}});
  }
}
