import { Test, TestingModule } from '@nestjs/testing';
import { Review1Controller } from './review1.controller';
import { Review1Service } from './review1.service';

describe('Review1Controller', () => {
  let controller: Review1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Review1Controller],
      providers: [Review1Service],
    }).compile();

    controller = module.get<Review1Controller>(Review1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
