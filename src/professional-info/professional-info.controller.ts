import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ProfessionalInfoService } from './professional-info.service';
import { CreateProfessionalInfoDto } from './dto/create-professional-info.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('professional-info')
export class ProfessionalInfoController {
  constructor(
    private readonly professionalInfoService: ProfessionalInfoService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createProfessionalInfoDto: CreateProfessionalInfoDto) {
    return this.professionalInfoService.create(createProfessionalInfoDto);
  }
}
