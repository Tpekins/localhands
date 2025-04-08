import { Test, TestingModule } from '@nestjs/testing';
import { ServiceorderService } from './serviceorder.service';

describe('ServiceorderService', () => {
  let service: ServiceorderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceorderService],
    }).compile();

    service = module.get<ServiceorderService>(ServiceorderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
