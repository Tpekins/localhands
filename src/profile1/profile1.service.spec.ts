import { Test, TestingModule } from '@nestjs/testing';
import { Profile1Service } from './profile1.service';

describe('Profile1Service', () => {
  let service: Profile1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Profile1Service],
    }).compile();

    service = module.get<Profile1Service>(Profile1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
