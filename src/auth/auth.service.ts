import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IUsersService } from 'src/users/users';
import { Services } from 'src/utils/constants';
import { compareHash } from 'src/utils/helpers';
import { ValidateUserCredentials } from 'src/utils/types';
import { IAuthService } from './auth';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUsersService,
  ) {}

  async validateUser(userCredentials: ValidateUserCredentials) {
    console.log('---@AuthService.validateUser---');
    console.log('User Credentials:');
    console.log(userCredentials);
    const user = await this.userService.findUser({
      email: userCredentials.email,
    });
    console.log('User from DB:');
    console.log(user);
    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
    const matched = await compareHash(userCredentials.password, user.password);
    if (matched) {
      console.log('------------------------------------');
      return user;
    } else {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
