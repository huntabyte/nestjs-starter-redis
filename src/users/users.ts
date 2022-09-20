import { User } from 'src/utils/typeorm';
import { CreateUserDetails, FindUserParams } from '../utils/types';

export interface IUsersService {
  createUser(userDetails: CreateUserDetails): Promise<User>;
  findUser(findUserParams: FindUserParams): Promise<User>;
}
