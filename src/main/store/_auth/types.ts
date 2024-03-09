import { UserModel } from '@domain/models';

export interface AuthState {
  me: UserModel | null;
}
