import { Injectable } from '@nestjs/common';
import { IUsersService } from './user';
import { CreateUserDetails } from '../utils/types';

@Injectable()
export class UsersService implements IUsersService {
  createUser(userDetails: CreateUserDetails) {
    console.log(userDetails);
  }
}
