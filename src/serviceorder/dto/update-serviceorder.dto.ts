import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceorderDto } from './create-serviceorder.dto';

export class UpdateServiceorderDto extends PartialType(CreateServiceorderDto) {}
