import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item, User } from 'src/utils/typeorm';
import { CreateItemDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import { IItemsService } from './items';
import { FindItemParams, UpdateItemDetails } from '../utils/types';
import { Services } from 'src/utils/constants';
import { IUsersService } from 'src/users/users';
import { isEmptyObj } from 'src/utils/helpers';

@Injectable()
export class ItemsService implements IItemsService {
  private readonly logger = new Logger(ItemsService.name);

  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    @Inject(Services.USERS) private readonly userService: IUsersService,
  ) {}

  async create(createItemDetails: CreateItemDetails, user: User) {
    const newItem = this.itemRepository.create({ user, ...createItemDetails });
    console.log(newItem);
    return this.itemRepository.save(newItem);
  }

  async findOne(findItemParams: FindItemParams, user: User) {
    const item = await this.itemRepository.findOneBy(findItemParams);
    if (!item) {
      throw new BadRequestException();
    }
    if (item.userId === user.id) {
      return item;
    } else {
      throw new ForbiddenException();
    }
  }

  async findAll(user: User) {
    const userDB = this.userService.findOne({ id: user.id });
    const userItems = (await userDB).items;
    if (userItems) {
      return userItems;
    } else {
      return [];
    }
  }

  async update(
    findItemParams: FindItemParams,
    updateItemDetails: UpdateItemDetails,
    user: User,
  ) {
    if (isEmptyObj(updateItemDetails)) {
      throw new BadRequestException(
        'At least one property on the item must be provided to update.',
      );
    }
    const item = await this.itemRepository.findOneBy(findItemParams);
    if (!item) {
      throw new NotFoundException();
    }
    if (item.userId === user.id) {
      const updatedItem = await this.itemRepository.update(
        findItemParams,
        updateItemDetails,
      );
      if (updatedItem) {
        return await this.itemRepository.findOneBy(findItemParams);
      } else {
        throw new InternalServerErrorException(
          'Something went wrong. Please try again later.',
        );
      }
    } else {
      throw new ForbiddenException();
    }
  }

  async remove(findItemParams: FindItemParams, user: User) {
    const item = await this.itemRepository.findOneBy(findItemParams);
    if (!item) {
      throw new NotFoundException();
    }
    if (item.userId === user.id) {
      const deletedItem = await this.itemRepository.delete(findItemParams);
      if (deletedItem) {
        return true;
      }
      throw new InternalServerErrorException(
        'Something went wrong. Please try again later.',
      );
    } else {
      throw new ForbiddenException();
    }
  }
}
