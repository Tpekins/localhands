import { Module } from '@nestjs/common';
import { Contract1Service } from './contract1.service';
import { Contract1Controller } from './contract1.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [Contract1Controller],
  providers: [Contract1Service, PrismaService],
})
export class Contract1Module {}
