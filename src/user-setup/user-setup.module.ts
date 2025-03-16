import { Module } from '@nestjs/common';
import { UserSetupController } from './user-setup.controller';
import { UserSetupService } from './user-setup.service';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/schema/user.schema';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserSetupController],
  providers: [UserSetupService],
})
export class UserSetupModule {}
