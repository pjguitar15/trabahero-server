import { Injectable } from '@nestjs/common';
import { validateSignupData } from './helper/validate';
import { hashPassword } from './helper/bcryptHelper';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

export type User = any;

export type CreateUser = { username: string; email: string; password: string };

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<IUser | { error: string }> {
    const { username, email, password } = createUserDto;

    // Validate user data
    const validationResult = validateSignupData(username, email, password);
    if (validationResult?.error) {
      return { error: validationResult.error };
    }

    // Hash the Password
    const securePassword = await hashPassword(password);

    // Check for Existing Users in Database
    const userExists = await this.userModel.findOne({ email }).exec();
    if (userExists) {
      return { error: 'User already exists' };
    }

    // ✅ Correctly create and save the user
    const newUser = new this.userModel({
      username,
      email,
      password: securePassword, // Store the hashed password
    });

    return await newUser.save(); // Save user in MongoDB and return the result
  }
}
