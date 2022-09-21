import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { IUsersService } from 'src/users/users';
import { Routes, Services } from '../utils/constants';
import { IItemsService } from './items';
import { AuthenticatedGuard } from '../auth/utils/Guards';
import { CreateItemDto } from './dtos/CreateItem.dto';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { FindItemParams } from '../utils/types';
import { UpdateItemDto } from './dtos/UpdateItem.dto';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

@Controller(Routes.ITEMS)
export class ItemsController {
  constructor(@Inject(Services.ITEMS) private itemService: IItemsService) {}

  @Get('')
  @UseGuards(AuthenticatedGuard)
  async getAllItems(@AuthUser() user: User) {
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

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  async getItem(
    @AuthUser() user: User,
    @Param() findItemParams: FindItemParams,
  ) {
    return await this.itemService.findItem(findItemParams, user);
  }

  @Put(':id')
  @UseGuards(AuthenticatedGuard)
  async updateItem(
    @AuthUser() user: User,
    @Param() findItemParams: FindItemParams,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return await this.itemService.updateItem(
      findItemParams,
      updateItemDto,
      user,
    );
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  async deleteItem(
    @AuthUser() user: User,
    @Param() findItemParams: FindItemParams,
    @Res() res: Response,
  ) {
    await this.itemService.deleteItem(findItemParams, user);
    res.sendStatus(HttpStatus.OK);
  }
}
