import { Injectable } from '@nestjs/common';
import { validateSignupData } from './helper/validate';
import { hashPassword } from './helper/bcryptHelper';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { LastCompletedStep } from './enums/lastCompletedStep.enums';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async findOne(email: string): Promise<any | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    try {
      const { username, email, password, firstName, lastName, middleName } =
        createUserDto;

      // Validate user data
      const validationResult = validateSignupData(username, email, password);
      if (validationResult?.error) {
        throw new BadRequestException(validationResult.error);
      }

      // Check for Existing Users
      const userExists = await this.userModel.findOne({ email }).exec();
      if (userExists) {
        throw new BadRequestException('User already exists');
      }

      // Hash the Password
      const securePassword = await hashPassword(password);

      // Create and Save the User with new fields
      const newUser = new this.userModel({
        username,
        email,
        password: securePassword,
        firstName,
        middleName,
        lastName,
        lastCompletedStep: LastCompletedStep.NOT_YET_SETUP,
      });

      return await newUser.save();
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'User creation failed',
      );
    }
  }
}
