import { PartialType } from '@nestjs/mapped-types';
import { CreateMeassageDto } from './create-meassage.dto';

export class UpdateMeassageDto extends PartialType(CreateMeassageDto) {}
