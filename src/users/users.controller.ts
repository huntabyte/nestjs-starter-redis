import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { IUsersService } from './users';
import { AdminGuard, AuthenticatedGuard } from '../auth/utils/Guards';
import { instanceToPlain } from 'class-transformer';
import { FindUserParams, UpdateUserDetails } from '../utils/types';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

@Controller('users')
export class UsersController {
  constructor(@Inject(Services.USERS) private userService: IUsersService) {}

  @Get('')
  @UseGuards(AdminGuard)
  async findAll() {
    return instanceToPlain(this.userService.findAll());
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  async findOne(@Param() findUserParams: FindUserParams) {
    return instanceToPlain(this.userService.findOne(findUserParams));
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async remove(
    @Param() findUserParams: FindUserParams,
    @AuthUser() user: User,
  ) {
    return this.userService.remove(findUserParams, user);
  }

  @Put(':id')
  @UseGuards(AuthenticatedGuard)
  async update(
    @Param() findUserParams: FindUserParams,
    @AuthUser() user: User,
    @Body() updateUserDetails: UpdateUserDto,
  ) {
    return this.userService.update(findUserParams, updateUserDetails, user);
  }
}
