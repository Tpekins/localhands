import { Test, TestingModule } from '@nestjs/testing';
import { ServicepackageService } from './servicepackage.service';

describe('ServicepackageService', () => {
  let service: ServicepackageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicepackageService],
    }).compile();

    service = module.get<ServicepackageService>(ServicepackageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
