import { Module } from '@nestjs/common';
import { Proposal1Service } from './proposal1.service';
import { Proposal1Controller } from './proposal1.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [Proposal1Controller],
  providers: [Proposal1Service, PrismaService],
})
export class Proposal1Module {}
