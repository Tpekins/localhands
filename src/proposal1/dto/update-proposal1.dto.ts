import { PartialType } from '@nestjs/mapped-types';
import { CreateProposal1Dto } from './create-proposal1.dto';

export class UpdateProposal1Dto extends PartialType(CreateProposal1Dto) {}
