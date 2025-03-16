import { Test, TestingModule } from '@nestjs/testing';
import { PersonalDetailsController } from './personal-details.controller';

describe('PersonalDetailsController', () => {
  let controller: PersonalDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalDetailsController],
    }).compile();

    controller = module.get<PersonalDetailsController>(
      PersonalDetailsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
