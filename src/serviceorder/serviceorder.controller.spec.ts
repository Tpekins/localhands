import { Test, TestingModule } from '@nestjs/testing';
import { ServiceorderController } from './serviceorder.controller';
import { ServiceorderService } from './serviceorder.service';

describe('ServiceorderController', () => {
  let controller: ServiceorderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceorderController],
      providers: [ServiceorderService],
    }).compile();

    controller = module.get<ServiceorderController>(ServiceorderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
