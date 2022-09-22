import { Logger, HttpStatus, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from './types';

export async function hashPassword(plainPassword: string) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(plainPassword, salt);
}

export async function compareHash(
  plainPassword: string,
  hashedPassword: string,
) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export function isAuthorized(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const logger = new Logger(isAuthorized.name);
  logger.log('isAuthorized');

  if (req.user) next();
  else throw new HttpException('Forbidden', HttpStatus.UNAUTHORIZED);
}

export function isEmptyObj(obj: any) {
  return Object.keys(obj).length === 0;
}
