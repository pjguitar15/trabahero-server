import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PersonalDetailsService } from './personal-details.service';
import { CreatePersonalDetailsDto } from './dto/create-personal-details.dto';
import { PersonalDetails } from './schema/personal-details.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('personal-details')
export class PersonalDetailsController {
  constructor(
    private readonly personalDetailsService: PersonalDetailsService,
  ) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createPersonalDetailsDto: CreatePersonalDetailsDto,
  ): Promise<PersonalDetails> {
    return this.personalDetailsService.create(createPersonalDetailsDto);
  }
}
