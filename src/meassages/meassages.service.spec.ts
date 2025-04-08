import { Test, TestingModule } from '@nestjs/testing';
import { MeassagesService } from './meassages.service';

describe('MeassagesService', () => {
  let service: MeassagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeassagesService],
    }).compile();

    service = module.get<MeassagesService>(MeassagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
