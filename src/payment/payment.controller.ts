import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  BadRequestException,
  ParseEnumPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/create-payment.dto';
import { PaymentStatus, Payment, Contract } from '@prisma/client';
import {
  DirectPaymentDto,
  ExpirePaymentDto,
  FapshiPaymentStatus,
  GeneratePaymentLinkDto,
  SearchTransactionsDto,
} from './dto/fapshi-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiQuery, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Payments')
@ApiBearerAuth('access-token')
@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create payment' })
  @ApiResponse({ status: 201, description: 'Payment created successfully' })
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment & { contract: Contract }> {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all payments' })
  @ApiQuery({ name: 'contractId', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: PaymentStatus })
  async findAll(
    @Query('contractId', new ParseIntPipe({ optional: true })) contractId?: number,
    @Query('status', new ParseEnumPipe(PaymentStatus, { optional: true })) status?: PaymentStatus,
  ): Promise<(Payment & { contract: Contract })[]> {
    return this.paymentService.findAll({ contractId, status });
  }

  @Get('contract/:contractId')
  findByContract(@Param('contractId', ParseIntPipe) contractId: number) {
    return this.paymentService.findByContract(contractId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.remove(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', new ParseEnumPipe(Object.values(PaymentStatus))) status: PaymentStatus,
  ) {
    return this.paymentService.updatePaymentStatus(id, status);
  }

  // Fapshi API integration endpoints

  @Post('fapshi/payment-link')
  @HttpCode(HttpStatus.CREATED)
  generatePaymentLink(@Body() generatePaymentLinkDto: GeneratePaymentLinkDto) {
    return this.paymentService.generatePaymentLink(generatePaymentLinkDto);
  }

  @Post('fapshi/create-with-payment-link')
  @HttpCode(HttpStatus.CREATED)
  createWithFapshiPaymentLink(
    @Body('payment') createPaymentDto: CreatePaymentDto,
    @Body('paymentLink') paymentLinkDto: GeneratePaymentLinkDto,
  ) {
    return this.paymentService.createWithFapshiPaymentLink(createPaymentDto, paymentLinkDto);
  }

  @Get('fapshi/payment-status/:transId')
  getPaymentStatus(@Param('transId') transId: string) {
    return this.paymentService.getPaymentStatus(transId);
  }

  @Post('fapshi/expire-payment')
  @HttpCode(HttpStatus.OK)
  expirePayment(@Body() expirePaymentDto: ExpirePaymentDto) {
    return this.paymentService.expirePayment(expirePaymentDto);
  }

  @Get('fapshi/user-transactions/:userId')
  getUserTransactions(@Param('userId') userId: string) {
    return this.paymentService.getUserTransactions(userId);
  }

  @Post('fapshi/direct-payment')
  @HttpCode(HttpStatus.CREATED)
  initiateDirectPayment(@Body() directPaymentDto: DirectPaymentDto) {
    return this.paymentService.initiateDirectPayment(directPaymentDto);
  }

  @Post('fapshi/create-with-direct-payment')
  @HttpCode(HttpStatus.CREATED)
  createWithFapshiDirectPayment(
    @Body('payment') createPaymentDto: CreatePaymentDto,
    @Body('directPayment') directPaymentDto: DirectPaymentDto,
  ) {
    return this.paymentService.createWithFapshiDirectPayment(createPaymentDto, directPaymentDto);
  }

  @Get('fapshi/search')
  searchTransactions(@Query() searchParams: SearchTransactionsDto) {
    return this.paymentService.searchTransactions(searchParams);
  }

  @Get('fapshi/balance')
  getServiceBalance() {
    return this.paymentService.getServiceBalance();
  }

  @Patch(':id/sync-status')
  syncPaymentStatusWithFapshi(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.syncPaymentStatusWithFapshi(id);
  }
}
