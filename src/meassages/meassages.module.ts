import { Module } from '@nestjs/common';
import { MeassagesService } from './meassages.service';
import { MeassagesController } from './meassages.controller';

@Module({
  controllers: [MeassagesController],
  providers: [MeassagesService],
})
export class MeassagesModule {}
