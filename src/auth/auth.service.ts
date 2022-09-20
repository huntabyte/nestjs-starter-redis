import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IUsersService } from 'src/users/user';
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
    const user = await this.userService.findUser({
      email: userCredentials.email,
    });
    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }

    return await compareHash(userCredentials.password, user.password);
  }
}
