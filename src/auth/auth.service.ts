import {
  Inject,
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { IUsersService } from 'src/users/users';
import { Services } from 'src/utils/constants';
import { compareHash } from 'src/utils/helpers';
import { ValidateUserCredentials } from 'src/utils/types';
import { IAuthService } from './auth';

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(Services.USERS) private readonly userService: IUsersService,
  ) {}

  async validateUser(userCredentials: ValidateUserCredentials) {
    this.logger.log('Validating User');
    const user = await this.userService.findUser({
      email: userCredentials.email,
    });
    if (!user) {
      this.logger.error('Invalid Credentials');
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
    const matched = await compareHash(userCredentials.password, user.password);
    if (matched) {
      this.logger.log('Successfully Validated User');
      return user;
    } else {
      this.logger.error('Invalid credentials provided to validateUser');
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
