import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProfessionalInfoDto } from './dto/create-professional-info.dto';
import { ProfessionalInfo } from './schema/professional-info.schema';

@Injectable()
export class ProfessionalInfoService {
  constructor(
    @InjectModel(ProfessionalInfo.name)
    private readonly professionalInfoModel: Model<ProfessionalInfo>,
  ) {}

  async create(
    createProfessionalInfoDto: CreateProfessionalInfoDto,
  ): Promise<ProfessionalInfo> {
    // Convert userId to ObjectId
    const userId = new Types.ObjectId(createProfessionalInfoDto.userId);
    console.log('userId', userId);
    // Create the professional info object
    const createdInfo = new this.professionalInfoModel({
      ...createProfessionalInfoDto,
      userId, // Add userId as ObjectId
    });

    // Save to the database
    return createdInfo.save();
  }
}
