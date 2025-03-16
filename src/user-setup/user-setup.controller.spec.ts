import { Test, TestingModule } from '@nestjs/testing';
import { UserSetupController } from './user-setup.controller';

describe('UserSetupController', () => {
  let controller: UserSetupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSetupController],
    }).compile();

    controller = module.get<UserSetupController>(UserSetupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
