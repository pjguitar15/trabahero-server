import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LastCompletedStep } from '../enums/lastCompletedStep.enums';
@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: false })
  middleName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    enum: Object.values(LastCompletedStep),
    required: true,
  })
  lastCompletedStep: LastCompletedStep;
}
export const UserSchema = SchemaFactory.createForClass(User);
