import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceassetDto } from './create-serviceasset.dto';

export class UpdateServiceassetDto extends PartialType(CreateServiceassetDto) {}
