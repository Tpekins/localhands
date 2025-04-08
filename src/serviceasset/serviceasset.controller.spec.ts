import { Test, TestingModule } from '@nestjs/testing';
import { ServiceassetController } from './serviceasset.controller';
import { ServiceassetService } from './serviceasset.service';

describe('ServiceassetController', () => {
  let controller: ServiceassetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceassetController],
      providers: [ServiceassetService],
    }).compile();

    controller = module.get<ServiceassetController>(ServiceassetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
