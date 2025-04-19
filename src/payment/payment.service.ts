import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentStatus, Prisma, Payment, Contract } from '@prisma/client';
import { FapshiService } from './services/fapshi.service';
import {
  DirectPaymentDto,
  ExpirePaymentDto,
  GeneratePaymentLinkDto,
  PaymentLinkResponseDto,
  PaymentStatusResponseDto,
  SearchTransactionsDto,
} from './dto/fapshi-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private fapshiService: FapshiService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment & { contract: Contract }> {
    return this.prisma.payment.create({
      data: {
        ...createPaymentDto,
        contractId: Number(createPaymentDto.contractId),
        status: PaymentStatus.PENDING,
      },
      include: {
        contract: true,
      },
    });
  }

  async findAll(filters?: {
    contractId?: number;
    status?: PaymentStatus;
  }): Promise<(Payment & { contract: Contract })[]> {
    const where: Prisma.PaymentWhereInput = {};

    if (filters?.contractId) {
      where.contractId = {
        equals: Number(filters.contractId), // Convert contractId to a number
      };
    }

    if (filters?.status) {
      where.status = {
        equals: filters.status,
      };
    }

    return this.prisma.payment.findMany({
      where,
      include: {
        contract: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number): Promise<Payment & { contract: Contract }> {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: {
        contract: {
          include: {},
        },
      },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }

  async findByTransactionId(transactionId: string): Promise<Payment & { contract: Contract }> {
    const payment = await this.prisma.payment.findFirst({
      where: { transactionId },
      include: {
        contract: true,
      },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with transaction ID ${transactionId} not found`);
    }

    return payment;
  }
  async update(
    id: number,
    updatePaymentDto: Partial<Prisma.PaymentUncheckedUpdateInput>,
  ): Promise<Payment & { contract: Contract }> {
    // First check if the payment exists
    await this.findOne(id);

    return this.prisma.payment.update({
      where: { id },
      data: updatePaymentDto,
      include: {
        contract: true,
      },
    });
  }

  async remove(id: number): Promise<Payment> {
    // First check if the payment exists
    await this.findOne(id);

    return this.prisma.payment.delete({
      where: { id },
    });
  }

  async findByContract(contractId: number) {
    return this.findAll({ contractId });
  }

  async updatePaymentStatus(id: number, status: PaymentStatus): Promise<Payment & { contract: Contract }> {
    // First check if the payment exists
    await this.findOne(id);

    return this.prisma.payment.update({
      where: { id },
      data: { status },
      include: {
        contract: true,
      },
    });
  }

  // Fapshi Payment Gateway Integration

  /**
   * Generate a payment link using Fapshi API
   * @param generatePaymentLinkDto
   * @returns Payment link response
   */
  async generatePaymentLink(generatePaymentLinkDto: GeneratePaymentLinkDto): Promise<PaymentLinkResponseDto> {
    return this.fapshiService.generatePaymentLink(generatePaymentLinkDto);
  }

  /**
   * Get the status of a payment transaction from Fapshi
   * @param transId
   * @returns Payment status
   */
  async getPaymentStatus(transId: string): Promise<PaymentStatusResponseDto> {
    return this.fapshiService.getPaymentStatus(transId);
  }

  /**
   * Expire a payment transaction to prevent further payments
   * @param expirePaymentDto
   * @returns Updated payment status
   */
  async expirePayment(expirePaymentDto: ExpirePaymentDto): Promise<PaymentStatusResponseDto> {
    return this.fapshiService.expirePayment(expirePaymentDto);
  }

  /**
   * Get all transactions associated with a specific user ID
   * @param userId
   * @returns Array of payment transactions
   */
  async getUserTransactions(userId: string): Promise<PaymentStatusResponseDto[]> {
    return this.fapshiService.getUserTransactions(userId);
  }

  /**
   * Initiate a direct payment request to a user's mobile device
   * @param directPaymentDto
   * @returns Direct payment response
   */
  async initiateDirectPayment(directPaymentDto: DirectPaymentDto) {
    return this.fapshiService.initiateDirectPayment(directPaymentDto);
  }

  /**
   * Search/filter transactions based on various criteria
   * @param searchParams
   * @returns Array of payment transactions
   */
  async searchTransactions(searchParams: SearchTransactionsDto): Promise<PaymentStatusResponseDto[]> {
    return this.fapshiService.searchTransactions(searchParams);
  }

  /**
   * Get the current balance of the service account
   * @returns Service balance
   */
  async getServiceBalance() {
    return this.fapshiService.getServiceBalance();
  }

  /**
   * Create a payment and initiate a Fapshi payment transaction
   * This method combines our internal payment creation with Fapshi payment initiation
   * @param createPaymentDto
   * @param paymentLinkDto
   * @returns Created payment with Fapshi payment link
   */
  async createWithFapshiPaymentLink(createPaymentDto: CreatePaymentDto, paymentLinkDto: GeneratePaymentLinkDto) {
    const payment = await this.create(createPaymentDto);

    try {
      const paymentLinkResponse = await this.generatePaymentLink({
        ...paymentLinkDto,
        amount: createPaymentDto.amount,
        externalId: payment.id, 
      });

      await this.update(payment.id, {
        // Removed toString()
        transactionId: paymentLinkResponse.transId,
      });

      return {
        payment,
        fapshiPaymentLink: paymentLinkResponse.link,
        fapshiTransId: paymentLinkResponse.transId,
      };
    } catch (error) {
      await this.remove(payment.id); // Removed toString()
      throw error;
    }
  }

  /**
   * Create a payment and initiate a direct Fapshi payment
   * @param createPaymentDto
   * @param directPaymentDto
   * @returns Created payment with Fapshi transaction ID
   */
  async createWithFapshiDirectPayment(createPaymentDto: CreatePaymentDto, directPaymentDto: DirectPaymentDto) {
    const payment = await this.create(createPaymentDto);

    try {
      const directPaymentResponse = await this.initiateDirectPayment({
        ...directPaymentDto,
        amount: createPaymentDto.amount,
        externalId: payment.id, // Removed toString()
      });

      await this.update(payment.id, {
        // Removed toString()
        transactionId: directPaymentResponse.transId,
      });

      return {
        payment,
        fapshiTransId: directPaymentResponse.transId,
      };
    } catch (error) {
      await this.remove(payment.id); // Removed toString()
      throw error;
    }
  }

  /**
   * Sync a payment status with Fapshi
   * This method checks the status of a payment transaction with Fapshi
   * and updates our internal payment status accordingly
   * @param id Payment ID
   * @returns Updated payment
   */
  async syncPaymentStatusWithFapshi(id: number): Promise<Payment & { contract: Contract }> {
    const payment = await this.findOne(id);

    if (!payment?.transactionId) {
      throw new BadRequestException('Payment does not have a Fapshi transaction ID');
    }

    const fapshiStatus = await this.getPaymentStatus(payment.transactionId);
    const mappedStatus = this.fapshiService.mapFapshiStatusToAppStatus(fapshiStatus.status) as PaymentStatus;

    if (payment.status !== mappedStatus) {
      return this.updatePaymentStatus(id, mappedStatus);
    }

    return payment;
  }
}
