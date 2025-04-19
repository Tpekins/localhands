import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, ValidateIf } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address', required: false })
  @ValidateIf((o) => !o.phoneNumber)
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email?: string;

  @ApiProperty({ example: '+1234567890', description: 'User phone number', required: false })
  @ValidateIf((o) => !o.email)
  @IsString({ message: 'Phone number must be a string' })
  @Length(10, 15, { message: 'Phone number must be between 10 and 15 characters' })
  phoneNumber?: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsString({ message: 'Password must be a string' })
  @Length(8, 100, { message: 'Password must be at least 8 characters long' })
  password: string;
}
