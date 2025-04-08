import { Injectable } from '@nestjs/common';
import { CreateMeassageDto } from './dto/create-meassage.dto';
import { UpdateMeassageDto } from './dto/update-meassage.dto';

@Injectable()
export class MeassagesService {
  create(createMeassageDto: CreateMeassageDto) {
    return 'This action adds a new meassage';
  }

  findAll() {
    return `This action returns all meassages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meassage`;
  }

  update(id: number, updateMeassageDto: UpdateMeassageDto) {
    return `This action updates a #${id} meassage`;
  }

  remove(id: number) {
    return `This action removes a #${id} meassage`;
  }
}
