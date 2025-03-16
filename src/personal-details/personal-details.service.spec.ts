import { Test, TestingModule } from '@nestjs/testing';
import { PersonalDetailsService } from './personal-details.service';

describe('PersonalDetailsService', () => {
  let service: PersonalDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalDetailsService],
    }).compile();

    service = module.get<PersonalDetailsService>(PersonalDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
