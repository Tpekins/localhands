import { Test, TestingModule } from '@nestjs/testing';
import { ServiceassetService } from './serviceasset.service';

describe('ServiceassetService', () => {
  let service: ServiceassetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceassetService],
    }).compile();

    service = module.get<ServiceassetService>(ServiceassetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
