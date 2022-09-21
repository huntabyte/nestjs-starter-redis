import { User } from 'src/utils/typeorm';
import { CreateUserDetails, FindUserParams } from '../utils/types';

export interface IUsersService {
  create(userDetails: CreateUserDetails): Promise<User>;
  findOne(findUserParams: FindUserParams): Promise<User>;
}
