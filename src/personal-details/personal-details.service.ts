import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PersonalDetails } from './schema/personal-details.schema';
import { CreatePersonalDetailsDto } from './dto/create-personal-details.dto';

@Injectable()
export class PersonalDetailsService {
  constructor(
    @InjectModel(PersonalDetails.name)
    private readonly personalDetailsModel: Model<PersonalDetails>,
  ) {}

  async create(
    createPersonalDetailsDto: CreatePersonalDetailsDto,
  ): Promise<PersonalDetails> {
    console.log('CHECK', createPersonalDetailsDto);
    const createdPersonalDetails = new this.personalDetailsModel({
      ...createPersonalDetailsDto,
      birthday: new Date(createPersonalDetailsDto.birthday),
      userId: new Types.ObjectId(createPersonalDetailsDto.userId),
    });
    return createdPersonalDetails.save();
  }
}
