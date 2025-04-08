import { Test, TestingModule } from '@nestjs/testing';
import { Proposal1Controller } from './proposal1.controller';
import { Proposal1Service } from './proposal1.service';

describe('Proposal1Controller', () => {
  let controller: Proposal1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Proposal1Controller],
      providers: [Proposal1Service],
    }).compile();

    controller = module.get<Proposal1Controller>(Proposal1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
