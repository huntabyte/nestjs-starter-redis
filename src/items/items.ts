import { Response } from 'express';
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
  findAllItems(user: User): Promise<Item[] | []>;
  updateItem(
    findItemParams: FindItemParams,
    updateItemDetails: UpdateItemDetails,
    user: User,
  ): Promise<Item | null>;
  deleteItem(findItemParams: FindItemParams, user: User): Promise<boolean>;
}
