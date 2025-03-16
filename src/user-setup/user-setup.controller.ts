import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserSetupService } from './user-setup.service';
import { User } from 'src/decorators/user.decorator';

@Controller('user-setup')
export class UserSetupController {
  constructor(private userSetupService: UserSetupService) {}

  @Put('last-completed-step')
  @UseGuards(JwtAuthGuard)
  async register(@User('userId') userId: string, @Body() body: any) {
    return this.userSetupService.updateLastCompletedStep(userId, body);
  }
}
