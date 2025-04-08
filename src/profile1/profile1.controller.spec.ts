import { Test, TestingModule } from '@nestjs/testing';
import { Profile1Controller } from './profile1.controller';
import { Profile1Service } from './profile1.service';

describe('Profile1Controller', () => {
  let controller: Profile1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Profile1Controller],
      providers: [Profile1Service],
    }).compile();

    controller = module.get<Profile1Controller>(Profile1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
