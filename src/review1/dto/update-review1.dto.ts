import { PartialType } from '@nestjs/mapped-types';
import { CreateReview1Dto } from './create-review1.dto';

export class UpdateReview1Dto extends PartialType(CreateReview1Dto) {}
