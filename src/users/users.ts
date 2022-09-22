import { User } from 'src/utils/typeorm';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import {
  CreateUserDetails,
  FindUserParams,
  UpdateUserDetails,
} from '../utils/types';

export interface IUsersService {
  create(userDetails: CreateUserDetails): Promise<User>;
  findOne(findUserParams: FindUserParams): Promise<User>;
  findAll(): Promise<User[] | []>;
  update(
    findUserParams: FindUserParams,
    updateUserDetails: UpdateUserDto,
    user: User,
  ): Promise<User>;
  remove(FindUserParams: FindUserParams, user: User): Promise<boolean>;
}
