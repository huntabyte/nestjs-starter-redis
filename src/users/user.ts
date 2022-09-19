import { CreateUserDetails } from '../utils/types';

export interface IUsersService {
  createUser(userDetails: CreateUserDetails);
}
