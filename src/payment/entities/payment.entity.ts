import { PaymentStatus, PaymentMethod } from '@prisma/client';
import { Prisma } from '@prisma/client';

export class Payment implements Prisma.PaymentUncheckedCreateInput {
  id?: number;
  contractId: number;
  amount: number;
  paymentMethod: PaymentMethod;
  transactionId: string;
  status?: PaymentStatus;
  createdAt?: Date | string;
}
