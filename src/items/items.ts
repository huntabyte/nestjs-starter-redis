import { Item, User } from 'src/utils/typeorm';
import {
  CreateItemDetails,
  FindItemParams,
  UpdateItemDetails,
} from '../utils/types';

export interface IItemsService {
  create(
    createItemDetails: CreateItemDetails,
    user: User,
  ): Promise<Item | null>;
  findOne(findItemParams: FindItemParams, user: User): Promise<Item | null>;
  findAll(user: User): Promise<Item[] | []>;
  update(
    findItemParams: FindItemParams,
    updateItemDetails: UpdateItemDetails,
    user: User,
  ): Promise<Item | null>;
  remove(findItemParams: FindItemParams, user: User): Promise<boolean>;
}
