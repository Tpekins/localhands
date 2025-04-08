import { Module } from '@nestjs/common';
import { ServicepackageService } from './servicepackage.service';
import { ServicepackageController } from './servicepackage.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ServicepackageController],
  providers: [ServicepackageService, PrismaService],
})
export class ServicepackageModule {}
