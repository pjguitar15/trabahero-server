import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfessionalInfoController } from './professional-info.controller';
import { ProfessionalInfoService } from './professional-info.service';
import {
  ProfessionalInfo,
  ProfessionalInfoSchema,
} from './schema/professional-info.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProfessionalInfo.name, schema: ProfessionalInfoSchema },
    ]),
  ],
  controllers: [ProfessionalInfoController],
  providers: [ProfessionalInfoService],
})
export class ProfessionalInfoModule {}
