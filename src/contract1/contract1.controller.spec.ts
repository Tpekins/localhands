import { Test, TestingModule } from '@nestjs/testing';
import { Contract1Controller } from './contract1.controller';
import { Contract1Service } from './contract1.service';

describe('Contract1Controller', () => {
  let controller: Contract1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Contract1Controller],
      providers: [Contract1Service],
    }).compile();

    controller = module.get<Contract1Controller>(Contract1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
