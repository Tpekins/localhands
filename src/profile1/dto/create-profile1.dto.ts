import { IsInt, IsOptional, IsString, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProfile1Dto {
  @IsInt({ message: 'User ID must be an integer and is required.' })
  userId: number;

  @IsOptional()
  @IsString({ message: 'Bio must be a string if provided.' })
  @Length(0, 500, { message: 'Bio must not exceed 500 characters.' })
  bio?: string;

  @IsOptional()
  @IsString({ message: 'Mobile money number must be a string if provided.' })
  mobileMoneyNumber?: string;

  @IsOptional()
  @IsString({ message: 'Bank account number must be a string if provided.' })
  bankAccountNumber?: string;

  @IsOptional()
  @IsString({ message: 'National ID URL must be a string if provided.' })
  nationalIdUrl?: string;

  @IsOptional()
  @IsString({ message: 'Location must be a string if provided.' })
  location?: string;
}

export class UpdateProfile1Dto extends PartialType(CreateProfile1Dto) {}
