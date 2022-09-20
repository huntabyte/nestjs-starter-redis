import { ValidateUserCredentials } from '../utils/types';
export interface IAuthService {
  validateUser(userCredentials: ValidateUserCredentials);
}
