import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  private readonly logger = new Logger(LocalAuthGuard.name);

  async canActivate(context: ExecutionContext) {
    this.logger.log('LocalAuthGuard called');
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  private readonly logger = new Logger(AuthenticatedGuard.name);
  async canActivate(context: ExecutionContext): Promise<any> {
    this.logger.log('AuthenticatedGuard called');
    const req = context.switchToHttp().getRequest();
    return req.isAuthenticated();
  }
}

@Injectable()
export class AdminGuard extends AuthenticatedGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    return (
      (super.canActivate(context) &&
        req.session.passport.user.role === 'admin') ||
      req.session.passport.user.role === 'superadmin'
    );
  }
}
