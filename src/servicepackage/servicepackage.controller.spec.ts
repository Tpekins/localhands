import { Test, TestingModule } from '@nestjs/testing';
import { ServicepackageController } from './servicepackage.controller';
import { ServicepackageService } from './servicepackage.service';

describe('ServicepackageController', () => {
  let controller: ServicepackageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicepackageController],
      providers: [ServicepackageService],
    }).compile();

    controller = module.get<ServicepackageController>(ServicepackageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
