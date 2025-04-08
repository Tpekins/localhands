import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Services') // Group the controller under "Services" in Swagger
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new service' })
  @ApiResponse({ status: 201, description: 'The service has been successfully created.' })
  @ApiResponse({ status: 404, description: 'Provider or category not found.' })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all services' })
  @ApiResponse({ status: 200, description: 'List of all services.' })
  findAll(
    @Query('status') status?: string,
    @Query('categoryId') categoryId?: string,
    @Query('providerId') providerId?: string,
  ) {
    return this.serviceService.findAll({ status, categoryId, providerId });
  }

  @Get('provider/:providerId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all services by a specific provider' })
  @ApiResponse({ status: 200, description: 'List of services by the provider.' })
  findByProvider(@Param('providerId') providerId: string) {
    return this.serviceService.findByProvider(+providerId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve a specific service by ID' })
  @ApiResponse({ status: 200, description: 'The service has been successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a specific service by ID' })
  @ApiResponse({ status: 200, description: 'The service has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a specific service by ID' })
  @ApiResponse({ status: 204, description: 'The service has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update the status of a specific service' })
  @ApiResponse({ status: 200, description: 'The service status has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Invalid status provided.' })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    if (!status) {
      throw new BadRequestException('Status is required');
    }

    if (!['available', 'unavailable', 'archived'].includes(status)) {
      throw new BadRequestException('Status must be one of: available, unavailable, archived');
    }

    return this.serviceService.updateStatus(+id, status);
  }

  @Patch(':id/increment-views')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Increment the view count of a specific service' })
  @ApiResponse({ status: 200, description: 'The service view count has been successfully incremented.' })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  incrementViews(@Param('id') id: string) {
    return this.serviceService.incrementViews(+id);
  }
}
