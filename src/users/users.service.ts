import {
  HttpException,
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { IUsersService } from './users';
import {
  CreateUserDetails,
  FindUserParams,
  UpdateUserDetails,
} from '../utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { hashPassword, isEmptyObj } from 'src/utils/helpers';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(userDetails: CreateUserDetails) {
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

  async findOne(findUserParams: FindUserParams): Promise<User> {
    return this.userRepository.findOneBy(findUserParams);
  }

  async findAll(): Promise<User[] | []> {
    return this.userRepository.find();
  }
  async update(
    findUserParams: FindUserParams,
    updateUserDetails: UpdateUserDetails,
    user: User,
  ): Promise<User> {
    if (isEmptyObj(updateUserDetails)) {
      throw new BadRequestException(
        'At least one property on the user must be provided to update.',
      );
    }
    const userDB = await this.userRepository.findOneBy(findUserParams);
    if (!userDB) {
      throw new BadRequestException();
    }
    if (
      userDB.id === user.id ||
      user.role === 'admin' ||
      user.role === 'superadmin'
    ) {
      const updatedUser = await this.userRepository.update(
        findUserParams,
        updateUserDetails,
      );
      if (updatedUser) {
        return await this.userRepository.findOneBy(findUserParams);
      } else {
        throw new InternalServerErrorException(
          'Something went wrong. Please try again later.',
        );
      }
    } else {
      throw new ForbiddenException();
    }
  }

  async remove(findUserParams: FindUserParams, user: User): Promise<boolean> {
    const userDB = await this.userRepository.findOneBy(findUserParams);
    if (!userDB) {
      throw new NotFoundException();
    }
    if (userDB.role === 'superadmin') {
      throw new ForbiddenException();
    }
    if (
      userDB.id === user.id ||
      user.role === 'admin' ||
      user.role === 'superadmin'
    ) {
      const deletedUser = await this.userRepository.delete(findUserParams);
      if (deletedUser) {
        return true;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
