import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const secretKey = process.env.JWT_SECRET || 'fallback_secret'; // Just to test
    const expiresIn = process.env.JWT_EXPIRES_IN || '3600s'; // Just to test

    console.log('🔹 JWT_SECRET from process.env:', secretKey); // 🔥 Debug

    try {
      const token = this.jwtService.sign(payload, {
        secret: secretKey,
        expiresIn: expiresIn,
      });
      console.log('✅ Generated Token:', token);
      return { access_token: token };
    } catch (error) {
      console.error('🚨 JWT Sign Error:', error.message);
      throw new UnauthorizedException(error.message);
    }
  }
}
