import {
  IsString,
  IsOptional,
  IsArray,
  IsUrl,
  IsMongoId,
  IsDateString,
} from 'class-validator';

export class CreatePersonalDetailsDto {
  @IsMongoId()
  userId: string;

  @IsString()
  phoneNumber: string;

  @IsDateString()
  birthday: string;

  @IsString()
  address: string;

  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
