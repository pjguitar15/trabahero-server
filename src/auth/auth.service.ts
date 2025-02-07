import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(username: string, pass: string): Promise<any> {
    // use this to compare hashed passwords
    // const isMatch = await comparePasswords('mypassword', securePassword);
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    // const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    // return result;
  }
}
