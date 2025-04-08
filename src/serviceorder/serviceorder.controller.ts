import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ServiceorderService } from './serviceorder.service';
import { CreateServiceorderDto } from './dto/create-serviceorder.dto';
import { UpdateServiceorderDto } from './dto/update-serviceorder.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Service Orders') // Group the controller under "Service Orders" in Swagger
@Controller('serviceorder')
export class ServiceorderController {
  constructor(private readonly serviceorderService: ServiceorderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new service order' })
  @ApiResponse({ status: 201, description: 'The service order has been successfully created.' })
  @ApiResponse({ status: 404, description: 'Service or client not found.' })
  create(@Body() createServiceorderDto: CreateServiceorderDto) {
    return this.serviceorderService.create(createServiceorderDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all service orders' })
  @ApiResponse({ status: 200, description: 'List of all service orders.' })
  findAll() {
    return this.serviceorderService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve a specific service order by ID' })
  @ApiResponse({ status: 200, description: 'The service order has been successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Service order not found.' })
  findOne(@Param('id') id: string) {
    return this.serviceorderService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a specific service order by ID' })
  @ApiResponse({ status: 200, description: 'The service order has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Service order not found.' })
  update(@Param('id') id: string, @Body() updateServiceorderDto: UpdateServiceorderDto) {
    return this.serviceorderService.update(+id, updateServiceorderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a specific service order by ID' })
  @ApiResponse({ status: 204, description: 'The service order has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Service order not found.' })
  remove(@Param('id') id: string) {
    return this.serviceorderService.remove(+id);
  }
}
