import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'personal_details' })
export class PersonalDetails extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true, type: Date })
  birthday: Date;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true, type: [String] })
  skills: string[];

  @Prop()
  imageUrl?: string;

  @Prop()
  description?: string;
}

export const PersonalDetailsSchema =
  SchemaFactory.createForClass(PersonalDetails);
