import { PartialType } from '@nestjs/mapped-types';
import { CreateProfile1Dto } from './create-profile1.dto';

export class UpdateProfile1Dto extends PartialType(CreateProfile1Dto) {}
