import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../storage/service/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log(email, pass);
    const user = await this.usersService.findByCredentials(email, pass);
    console.log(user);
    return user
  }

  async login(user: any) {
    console.log(user);
    const payload = { email: user.email, id: user.id, wallet: user.wallet };
    return {
      user: payload,
      token: this.jwtService.sign(payload),
    };
  }
}
