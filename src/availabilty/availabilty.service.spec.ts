import { Test, TestingModule } from '@nestjs/testing';
import { AvailabiltyService } from './availabilty.service';

describe('AvailabiltyService', () => {
  let service: AvailabiltyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvailabiltyService],
    }).compile();

    service = module.get<AvailabiltyService>(AvailabiltyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
