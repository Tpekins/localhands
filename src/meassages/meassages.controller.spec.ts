import { Test, TestingModule } from '@nestjs/testing';
import { MeassagesController } from './meassages.controller';
import { MeassagesService } from './meassages.service';

describe('MeassagesController', () => {
  let controller: MeassagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeassagesController],
      providers: [MeassagesService],
    }).compile();

    controller = module.get<MeassagesController>(MeassagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
