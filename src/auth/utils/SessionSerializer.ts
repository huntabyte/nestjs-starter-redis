import { Inject, Injectable, Logger } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { IUsersService } from 'src/users/users';
import { Services } from 'src/utils/constants';
import { User } from 'src/utils/typeorm';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  private readonly logger = new Logger(SessionSerializer.name);
  constructor(
    @Inject(Services.USERS) private readonly userService: IUsersService,
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    this.logger.log('Serialized user');
    done(null, user);
  }

  async deserializeUser(user: User, done: Function) {
    this.logger.log('Deserialized User');
    const { password: _, ...userDB } = await this.userService.findOne({
      id: user.id,
    });
    return userDB ? done(null, userDB) : done(null, null);
  }
}
