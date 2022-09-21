import { Inject, Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Services } from 'src/utils/constants';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(
    @Inject(Services.AUTH) private readonly authService: AuthService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    this.logger.log('validate');
    return this.authService.validateUser({ email, password });
  }
}
