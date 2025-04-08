import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { Proposal1Service } from './proposal1.service';
import { CreateProposal1Dto } from './dto/create-proposal1.dto';
import { UpdateProposal1Dto } from './dto/update-proposal1.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Proposals') // Group the controller under "Proposals" in Swagger
@Controller('proposal1')
export class Proposal1Controller {
  constructor(private readonly proposal1Service: Proposal1Service) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new proposal' })
  @ApiResponse({ status: 201, description: 'The proposal has been successfully created.' })
  @ApiResponse({ status: 404, description: 'Service or provider not found.' })
  create(@Body() createProposal1Dto: CreateProposal1Dto) {
    return this.proposal1Service.create(createProposal1Dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all proposals' })
  @ApiResponse({ status: 200, description: 'List of all proposals.' })
  findAll() {
    return this.proposal1Service.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve a specific proposal by ID' })
  @ApiResponse({ status: 200, description: 'The proposal has been successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Proposal not found.' })
  findOne(@Param('id') id: string) {
    return this.proposal1Service.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a specific proposal by ID' })
  @ApiResponse({ status: 200, description: 'The proposal has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Proposal not found.' })
  update(@Param('id') id: string, @Body() updateProposal1Dto: UpdateProposal1Dto) {
    return this.proposal1Service.update(+id, updateProposal1Dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a specific proposal by ID' })
  @ApiResponse({ status: 204, description: 'The proposal has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Proposal not found.' })
  remove(@Param('id') id: string) {
    return this.proposal1Service.remove(+id);
  }
}
