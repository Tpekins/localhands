import { IsString, IsOptional, IsNumber, IsPositive, IsIn, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateServiceDto {
  @IsString({ message: 'Title must be a string and is required.' })
  @Length(3, 100, { message: 'Title must be between 3 and 100 characters.' })
  title: string;

  @IsString({ message: 'Description must be a string and is required.' })
  @Length(10, 1000, { message: 'Description must be between 10 and 1000 characters.' })
  description: string;

  @IsOptional()
  @IsNumber({}, { message: 'Category ID must be a number if provided.' })
  categoryId?: number;

  @IsNumber({}, { message: 'Price must be a number and is required.' })
  @IsPositive({ message: 'Price must be a positive number.' })
  price: number;

  @IsOptional()
  @IsString({ message: 'Status must be a string if provided.' })
  @IsIn(['available', 'unavailable', 'archived'], {
    message: 'Status must be one of "available", "unavailable", or "archived".',
  })
  status?: string;

  @IsNumber({}, { message: 'Provider ID must be a number and is required.' })
  providerId: number;
}

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}
