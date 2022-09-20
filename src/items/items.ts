import { Item } from 'src/utils/typeorm';
import { CreateItemDetails, FindItemParams } from '../utils/types';

export interface IItemsService {
  createItem(
    createItemDetails: CreateItemDetails,
    requestUser: Express.User,
  ): Promise<boolean>;
  findItem(
    findItemParams: FindItemParams,
    requestUser: Express.User,
  ): Promise<boolean>;
}
