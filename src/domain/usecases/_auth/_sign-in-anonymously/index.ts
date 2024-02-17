import { UserModel } from '@domain/models';

export interface SignInAnonymouslyUsecase {
  execute(): Promise<UserModel>;
}
