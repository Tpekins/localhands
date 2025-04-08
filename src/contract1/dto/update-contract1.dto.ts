import { PartialType } from '@nestjs/mapped-types';
import { CreateContract1Dto } from './create-contract1.dto';

export class UpdateContract1Dto extends PartialType(CreateContract1Dto) {}
