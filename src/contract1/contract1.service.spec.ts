import { Test, TestingModule } from '@nestjs/testing';
import { Contract1Service } from './contract1.service';

describe('Contract1Service', () => {
  let service: Contract1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Contract1Service],
    }).compile();

    service = module.get<Contract1Service>(Contract1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
