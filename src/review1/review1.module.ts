import { Module } from '@nestjs/common';
import { Review1Service } from './review1.service';
import { Review1Controller } from './review1.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [Review1Controller],
  providers: [Review1Service, PrismaService],
})
export class Review1Module {}
