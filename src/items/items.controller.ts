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

  @Post('')
  @UseGuards(AuthenticatedGuard)
  async create(@AuthUser() user: User, @Body() createItemDto: CreateItemDto) {
    return await this.itemService.create(createItemDto, user);
  }

  @Get('')
  @UseGuards(AuthenticatedGuard)
  async findAll(@AuthUser() user: User) {
    return this.itemService.findAll(user);
  }

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  async findOne(
    @AuthUser() user: User,
    @Param() findItemParams: FindItemParams,
  ) {
    return await this.itemService.findOne(findItemParams, user);
  }

  @Put(':id')
  @UseGuards(AuthenticatedGuard)
  async update(
    @AuthUser() user: User,
    @Param() findItemParams: FindItemParams,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return await this.itemService.update(findItemParams, updateItemDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  async remove(
    @AuthUser() user: User,
    @Param() findItemParams: FindItemParams,
    @Res() res: Response,
  ) {
    await this.itemService.remove(findItemParams, user);
    res.sendStatus(HttpStatus.OK);
  }
}
