import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { IUsersService } from 'src/users/users';
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
    console.log('---@SessionSerializer.serializeUser---');
    console.log('User:');
    console.log(user);
    console.log('------------------------------------');
    done(null, user);
  }

  async deserializeUser(user: User, done: Function) {
    const { password: _, ...userDB } = await this.userService.findUser({
      id: user.id,
    });
    console.log('---@SessionSerializer.deserializeUser---');
    console.log('User:');
    console.log(user);
    console.log('UserDB:');
    console.log(userDB);
    console.log('------------------------------------');
    return userDB ? done(null, userDB) : done(null, null);
  }
}
