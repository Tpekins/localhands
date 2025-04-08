import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { JobModule } from './job/job.module';
import { ProposalModule } from './proposal/proposal.module';
import { PaymentModule } from './payment/payment.module';
import { ReviewModule } from './review/review.module';
import { ContractModule } from './contract/contract.module';
import { UserModule } from './user/user.module';
import { Profile1Module } from './profile1/profile1.module';
import { ServiceModule } from './service/service.module';
import { ServiceorderModule } from './serviceorder/serviceorder.module';
import { Contract1Module } from './contract1/contract1.module';
import { Payment1Module } from './payment1/payment1.module';
import { Review1Module } from './review1/review1.module';
import { BookingModule } from './booking/booking.module';
import { CategoryModule } from './category/category.module';
import { NotificationsModule } from './notifications/notifications.module';
import { Proposal1Module } from './proposal1/proposal1.module';
import { MeassagesModule } from './meassages/meassages.module';
import { ServicepackageModule } from './servicepackage/servicepackage.module';
import { AvailabiltyModule } from './availabilty/availabilty.module';
import { ProviderModule } from './provider/provider.module';
import { ServiceassetModule } from './serviceasset/serviceasset.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    ProfileModule,
    JobModule,
    ProposalModule,
    PaymentModule,
    ReviewModule,
    ContractModule,
    UserModule,
    Profile1Module,
    ServiceModule,
    ServiceorderModule,
    Contract1Module,
    Payment1Module,
    Review1Module,
    BookingModule,
    CategoryModule,
    NotificationsModule,
    Proposal1Module,
    MeassagesModule,
    ServicepackageModule,
    AvailabiltyModule,
    ProviderModule,
    ServiceassetModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
