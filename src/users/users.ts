import { User } from 'src/utils/typeorm';
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
    updateUserDetails: UpdateUserDetails,
    user: User,
  ): Promise<User>;
  remove(FindUserParams: FindUserParams, user: User): Promise<boolean>;
}
