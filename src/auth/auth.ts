import { User } from 'src/utils/typeorm';
import { ValidateUserCredentials } from '../utils/types';
export interface IAuthService {
  validateUser(userCredentials: ValidateUserCredentials): Promise<User | null>;
}
