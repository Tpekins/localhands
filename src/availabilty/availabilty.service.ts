import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAvailabiltyDto } from './dto/create-availabilty.dto';
import { UpdateAvailabiltyDto } from './dto/update-availabilty.dto';

@Injectable()
export class AvailabiltyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAvailabiltyDto: CreateAvailabiltyDto) {
    const { providerId, dayOfWeek, startTime, endTime } = createAvailabiltyDto;

    // Ensure the provider exists
    const provider = await this.prisma.user.findUnique({
      where: { id: providerId },
    });
    if (!provider) {
      throw new NotFoundException(`Provider with ID ${providerId} not found`);
    }

    // Create the availability
    return this.prisma.availability.create({
      data: {
        providerId,
        dayOfWeek,
        startTime,
        endTime,
      },
    });
  }

  async findAll() {
    return this.prisma.availability.findMany({
      include: {
        provider: true, // Include provider details
      },
    });
  }

  async findOne(id: number) {
    const availability = await this.prisma.availability.findUnique({
      where: { id },
      include: {
        provider: true, // Include provider details
      },
    });
    if (!availability) {
      throw new NotFoundException(`Availability with ID ${id} not found`);
    }
    return availability;
  }

  async update(id: number, updateAvailabiltyDto: UpdateAvailabiltyDto) {
    const availability = await this.prisma.availability.findUnique({
      where: { id },
    });
    if (!availability) {
      throw new NotFoundException(`Availability with ID ${id} not found`);
    }

    return this.prisma.availability.update({
      where: { id },
      data: updateAvailabiltyDto,
    });
  }

  async remove(id: number) {
    const availability = await this.prisma.availability.findUnique({
      where: { id },
    });
    if (!availability) {
      throw new NotFoundException(`Availability with ID ${id} not found`);
    }

    return this.prisma.availability.delete({
      where: { id },
    });
  }
}
