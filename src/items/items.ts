import { Item, User } from 'src/utils/typeorm';
import {
  CreateItemDetails,
  FindItemParams,
  UpdateItemDetails,
} from '../utils/types';

export interface IItemsService {
  createItem(
    createItemDetails: CreateItemDetails,
    user: User,
  ): Promise<Item | null>;
  findItem(findItemParams: FindItemParams, user: User): Promise<Item | null>;
  findAllItems(user: User);
  updateItem(
    findItemParams: FindItemParams,
    updateItemDetails: UpdateItemDetails,
    user: User,
  ): Promise<Item | null>;
}
