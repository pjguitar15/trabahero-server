import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'; // Import Types to use ObjectId
import { IUser } from 'src/users/interface/user.interface';

@Injectable()
export class UserSetupService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async updateLastCompletedStep(userId: string, body: any) {
    // Specify types for parameters
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: new Types.ObjectId(userId) },
      { lastCompletedStep: body.lastCompletedStep },
      { new: true }, // Return the updated document
    );

    return updatedUser;
  }
}
