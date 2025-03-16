import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Sub-schemas (unchanged)
@Schema()
export class Certification {
  @Prop({ required: false }) // Optional
  name: string;

  @Prop({ required: false }) // Optional
  year: string;
}

@Schema()
export class Education {
  @Prop({ required: false }) // Optional
  school: string;

  @Prop({ required: false }) // Optional
  degree: string;

  @Prop({ required: false }) // Optional
  year: string;
}

@Schema()
export class Skill {
  @Prop({ required: true }) // Required
  name: string;

  @Prop({ required: true, enum: ['online', 'offline'] }) // Required with enum
  type: string;
}

@Schema()
export class SocialMedia {
  @Prop({ required: false }) // Optional
  linkedin: string;

  @Prop({ required: false }) // Optional
  portfolio: string;
}

@Schema()
export class WorkExperience {
  @Prop({ required: false }) // Optional
  company: string;

  @Prop({ required: false }) // Optional
  jobTitle: string;

  @Prop({
    required: false,
    enum: ['full-time', 'part-time', 'freelance', 'contract', 'internship'],
  }) // Optional with enum
  employmentType: string;

  @Prop({ required: false }) // Optional
  fromYear: string;

  @Prop({ required: false }) // Optional
  toYear: string;

  @Prop({ required: false }) // Optional
  responsibilities: string;
}

@Schema()
export class WorkSample {
  @Prop({ required: true }) // Required
  title: string;

  @Prop({ required: true }) // Required
  description: string;

  @Prop({ type: [String], required: true, minlength: 1 }) // At least 1 image required
  images: string[];

  @Prop({ required: false }) // Optional
  link: string;

  @Prop({ required: true }) // Required
  workType: string;
}

// Main schema
@Schema({ collection: 'professional-information' })
export class ProfessionalInfo extends Document {
  @Prop({ type: Types.ObjectId, required: true }) // Required
  userId: Types.ObjectId;

  @Prop({ type: [Certification], required: false }) // Optional
  certifications: Certification[];

  @Prop({ type: [String], required: true }) // Required
  dialects: string[];

  @Prop({ type: [Education], required: false }) // Optional
  education: Education[];

  @Prop({ type: [Skill], required: true }) // Required
  skills: Skill[];

  @Prop({ type: SocialMedia, required: false }) // Optional
  socialMedia: SocialMedia;

  @Prop({ type: [WorkExperience], required: false }) // Optional
  workExperience: WorkExperience[];

  @Prop({ type: [WorkSample], required: true }) // Required
  workSamples: WorkSample[];
}

export const ProfessionalInfoSchema =
  SchemaFactory.createForClass(ProfessionalInfo);
