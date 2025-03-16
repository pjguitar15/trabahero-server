import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonalDetailsController } from './personal-details.controller';
import { PersonalDetailsService } from './personal-details.service';
import {
  PersonalDetails,
  PersonalDetailsSchema,
} from './schema/personal-details.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PersonalDetails.name, schema: PersonalDetailsSchema },
    ]),
  ],
  controllers: [PersonalDetailsController],
  providers: [PersonalDetailsService],
})
export class PersonalDetailsModule {}
