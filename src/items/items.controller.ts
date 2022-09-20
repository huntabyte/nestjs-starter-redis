import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { IUsersService } from 'src/users/users';
import { Routes, Services } from '../utils/constants';
import { IItemsService } from './items';
import { AuthenticatedGuard } from '../auth/utils/Guards';
import { CreateItemDto } from './dtos/CreateItem.dto';
import { Request } from 'express';

@Controller(Routes.ITEMS)
export class ItemsController {
  constructor(
    @Inject(Services.ITEMS) private itemService: IItemsService,
    @Inject(Services.USERS) private userService: IUsersService,
  ) {}

  @Post('')
  @UseGuards(AuthenticatedGuard)
  async createItem(@Body() createItemDto: CreateItemDto, @Req() req: Request) {
    return await this.itemService.createItem(createItemDto, req.user);
  }
}
