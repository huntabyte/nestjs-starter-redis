import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item, User } from 'src/utils/typeorm';
import { CreateItemDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import { IItemsService } from './items';
import { FindItemParams } from '../utils/types';
import { Services } from 'src/utils/constants';
import { IUsersService } from 'src/users/users';

@Injectable()
export class ItemsService implements IItemsService {
  private readonly logger = new Logger(ItemsService.name);

  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(Services.USERS) private readonly userService: IUsersService,
  ) {}

  async createItem(createItemDetails: CreateItemDetails, user: User) {
    const newItem = this.itemRepository.create({ user, ...createItemDetails });
    console.log(newItem);
    return this.itemRepository.save(newItem);
  }

  async findItem(findItemParams: FindItemParams, user: User) {
    console.log(findItemParams);
    console.log(user);
    return null;
  }

  async findAllItems(user: User) {
    const userDB = this.userService.findUser({ id: user.id });
    const userItems = (await userDB).items;
    if (userItems) {
      return userItems;
    } else {
      return [];
    }
  }
}
