import { Test, TestingModule } from '@nestjs/testing';
import { AvailabiltyController } from './availabilty.controller';
import { AvailabiltyService } from './availabilty.service';

describe('AvailabiltyController', () => {
  let controller: AvailabiltyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvailabiltyController],
      providers: [AvailabiltyService],
    }).compile();

    controller = module.get<AvailabiltyController>(AvailabiltyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
