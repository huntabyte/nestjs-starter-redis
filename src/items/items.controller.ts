import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IUsersService } from 'src/users/users';
import { Routes, Services } from '../utils/constants';
import { IItemsService } from './items';
import { AuthenticatedGuard } from '../auth/utils/Guards';
import { CreateItemDto } from './dtos/CreateItem.dto';
import { Request } from 'express';
import { AuthenticatedRequest } from 'src/utils/types';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';

@Controller(Routes.ITEMS)
export class ItemsController {
  constructor(
    @Inject(Services.ITEMS) private itemService: IItemsService,
    @Inject(Services.USERS) private userService: IUsersService,
  ) {}

  @Get('')
  @UseGuards(AuthenticatedGuard)
  async getItems(@AuthUser() user: User) {
    return this.itemService.findAllItems(user);
  }

  @Post('')
  @UseGuards(AuthenticatedGuard)
  async createItem(
    @AuthUser() user: User,
    @Body() createItemDto: CreateItemDto,
  ) {
    return await this.itemService.createItem(createItemDto, user);
  }
}
