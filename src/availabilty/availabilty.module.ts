import { Module } from '@nestjs/common';
import { AvailabiltyService } from './availabilty.service';
import { AvailabiltyController } from './availabilty.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AvailabiltyController],
  providers: [AvailabiltyService, PrismaService],
})
export class AvailabiltyModule {}
