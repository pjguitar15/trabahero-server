import { Test, TestingModule } from '@nestjs/testing';
import { UserSetupService } from './user-setup.service';

describe('UserSetupService', () => {
  let service: UserSetupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSetupService],
    }).compile();

    service = module.get<UserSetupService>(UserSetupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
