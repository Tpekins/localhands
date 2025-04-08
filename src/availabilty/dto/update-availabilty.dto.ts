import { PartialType } from '@nestjs/mapped-types';
import { CreateAvailabiltyDto } from './create-availabilty.dto';

export class UpdateAvailabiltyDto extends PartialType(CreateAvailabiltyDto) {}
