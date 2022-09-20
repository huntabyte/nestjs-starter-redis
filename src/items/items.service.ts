import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item, User } from 'src/utils/typeorm';
import { CreateItemDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import { IItemsService } from './items';
import { FindItemParams } from '../utils/types';

@Injectable()
export class ItemsService implements IItemsService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}

  async createItem(
    createItemDetails: CreateItemDetails,
    requestUser: Express.User,
  ) {
    console.log(createItemDetails);
    console.log(requestUser);
    return await false;
  }

  async findItem(findItemParams: FindItemParams, requestUser: Express.User) {
    console.log(findItemParams);
    console.log(requestUser);
    return await true;
  }
}
