import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileController } from './profile/profile.controller';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { UserSetupModule } from './user-setup/user-setup.module';
import { PersonalDetailsModule } from './personal-details/personal-details.module';
import { ProfessionalInfoModule } from './professional-info/professional-info.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_DB_STRING, {
      dbName: process.env.MONGO_DB_NAME,
    }),
    AuthModule,
    UsersModule,
    ProfileModule,
    UserSetupModule,
    PersonalDetailsModule,
    ProfessionalInfoModule,
  ],
  controllers: [AppController, ProfileController],
  providers: [AppService],
})
export class AppModule {}
