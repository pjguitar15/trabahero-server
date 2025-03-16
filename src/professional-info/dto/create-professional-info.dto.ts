import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

class CertificationDto {
  @IsString()
  @IsOptional() // Optional
  name: string;

  @IsString()
  @IsOptional() // Optional
  year: string;
}

class EducationDto {
  @IsString()
  @IsOptional() // Optional
  school: string;

  @IsString()
  @IsOptional() // Optional
  degree: string;

  @IsString()
  @IsOptional() // Optional
  year: string;
}

class SkillDto {
  @IsString()
  @IsNotEmpty() // Required
  name: string;

  @IsString()
  @IsNotEmpty() // Required
  @IsEnum(['online', 'offline']) // Enum validation
  type: string;
}

class SocialMediaDto {
  @IsString()
  @IsOptional() // Optional
  linkedin: string;

  @IsString()
  @IsOptional() // Optional
  portfolio: string;
}

class WorkExperienceDto {
  @IsString()
  @IsOptional() // Optional
  company: string;

  @IsString()
  @IsOptional() // Optional
  jobTitle: string;

  @IsString()
  @IsOptional() // Optional
  @IsEnum(['full-time', 'part-time', 'freelance', 'contract', 'internship']) // Enum validation
  employmentType: string;

  @IsString()
  @IsOptional() // Optional
  fromYear: string;

  @IsString()
  @IsOptional() // Optional
  toYear: string;

  @IsString()
  @IsOptional() // Optional
  responsibilities: string;
}

class WorkSampleDto {
  @IsString()
  @IsNotEmpty() // Required
  title: string;

  @IsString()
  @IsNotEmpty() // Required
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true }) // At least 1 image required
  images: string[];

  @IsString()
  @IsOptional() // Optional
  link: string;

  @IsString()
  @IsNotEmpty() // Required
  workType: string;
}

export class CreateProfessionalInfoDto {
  @IsString()
  @IsNotEmpty() // Required
  userId: string; // userId is required

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificationDto)
  @IsOptional() // Optional
  certifications: CertificationDto[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true }) // Required
  dialects: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  @IsOptional() // Optional
  education: EducationDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillDto)
  @IsNotEmpty({ each: true }) // Required
  skills: SkillDto[];

  @IsObject()
  @ValidateNested()
  @Type(() => SocialMediaDto)
  @IsOptional() // Optional
  socialMedia: SocialMediaDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkExperienceDto)
  @IsOptional() // Optional
  workExperience: WorkExperienceDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkSampleDto)
  @IsNotEmpty({ each: true }) // Required
  workSamples: WorkSampleDto[];
}
