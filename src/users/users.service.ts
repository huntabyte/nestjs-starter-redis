import { HttpException, Injectable } from '@nestjs/common';
import { IUsersService } from './user';
import {
  CreateUserDetails,
  ValidateUserCredentials,
  FindUserParams,
} from '../utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/utils/helpers';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDetails: CreateUserDetails) {
    const exists = await this.userRepository.findOneBy({
      email: userDetails.email,
    });
    if (exists) {
      throw new HttpException('User already exists.', 409);
    }
    const password = await hashPassword(userDetails.password);
    const newUser = this.userRepository.create({ ...userDetails, password });
    return this.userRepository.save(newUser);
  }

  async findUser(findUserParams: FindUserParams): Promise<User> {
    return this.userRepository.findOneBy(findUserParams);
  }
}
