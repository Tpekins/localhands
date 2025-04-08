import { Module } from '@nestjs/common';
import { Profile1Service } from './profile1.service';
import { Profile1Controller } from './profile1.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [Profile1Controller],
  providers: [Profile1Service, PrismaService],
})
export class Profile1Module {}
