import { UserModel } from '@domain/models';

export interface ISignInAnonymouslyUsecase {
  execute(): Promise<UserModel>;
}
