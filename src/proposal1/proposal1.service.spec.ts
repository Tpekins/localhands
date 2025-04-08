import { Test, TestingModule } from '@nestjs/testing';
import { Proposal1Service } from './proposal1.service';

describe('Proposal1Service', () => {
  let service: Proposal1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Proposal1Service],
    }).compile();

    service = module.get<Proposal1Service>(Proposal1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
