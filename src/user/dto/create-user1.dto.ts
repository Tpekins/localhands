import { IsString, IsEmail, IsOptional, Length, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @IsString({ message: 'Phone number must be a string and is required.' })
  @Length(10, 15, { message: 'Phone number must be between 10 and 15 characters.' })
  phoneNumber: string;

  @IsEmail({}, { message: 'Email must be a valid email address and is required.' })
  email: string;

  @IsString({ message: 'Password hash must be a string and is required.' })
  @Length(8, 100, { message: 'Password must be at least 8 characters long.' })
  password: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be a valid user role if provided.' })
  role?: UserRole; // Optional field, can be UserRole.USER or UserRole.ADMIN
  // Add other fields as necessary
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
