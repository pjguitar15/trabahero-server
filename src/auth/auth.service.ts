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

    console.log('expiresIn', expiresIn);

    try {
      const token = this.jwtService.sign(payload, {
        secret: secretKey,
        expiresIn,
      });
      console.log('✅ Generated Token:', token);
      return { access_token: token };
    } catch (error) {
      console.error('🚨 JWT Sign Error:', error.message);
      throw new UnauthorizedException(error.message);
    }
  }

  async validateSession(token: string) {
    try {
      const secretKey = process.env.JWT_SECRET || 'fallback_secret';
      const payload = await this.jwtService.verify(token, {
        secret: secretKey,
      });

      // Get fresh user data from database
      const user = await this.usersService.findOne(payload.email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Return session info without sensitive data
      return {
        id: user.id,
        email: user.email,
        isValid: true,
      };
    } catch (error) {
      console.error('🚨 Session Validation Error:', error.message);
      throw new UnauthorizedException('Invalid session');
    }
  }
}
