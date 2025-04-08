import { IsInt, IsString, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateMeassageDto {
  @IsInt({ message: 'Sender ID must be an integer and is required.' })
  senderId: number;

  @IsInt({ message: 'Receiver ID must be an integer and is required.' })
  receiverId: number;

  @IsString({ message: 'Content must be a string and is required.' })
  @Length(1, 500, { message: 'Content must be between 1 and 500 characters.' })
  content: string;
}

export class UpdateMeassageDto extends PartialType(CreateMeassageDto) {}
