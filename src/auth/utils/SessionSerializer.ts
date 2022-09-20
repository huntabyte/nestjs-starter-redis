import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { IUsersService } from 'src/users/user';
import { Services } from 'src/utils/constants';
import { User } from 'src/utils/typeorm';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUsersService,
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, user);
  }

  async deserializeUser(user: User, done: Function) {
    const userDB = await this.userService.findUser({ id: user.id });
    console.log(userDB);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
