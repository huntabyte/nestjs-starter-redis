import { Request } from 'express';
import { User } from './typeorm';

export type CreateUserDetails = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type ValidateUserCredentials = {
  email: string;
  password: string;
};

export type FindUserParams = Partial<{
  id: number;
  email: string;
}>;

export type CreateItemDetails = {
  name: string;
  description: string;
};

export type FindItemParams = {
  id: number;
};

export interface AuthenticatedRequest extends Request {
  user: User;
}
