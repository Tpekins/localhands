import { Test, TestingModule } from '@nestjs/testing';
import { Review1Service } from './review1.service';

describe('Review1Service', () => {
  let service: Review1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Review1Service],
    }).compile();

    service = module.get<Review1Service>(Review1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
