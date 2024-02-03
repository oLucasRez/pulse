import { UserModel } from '@domain/models';

export interface GetCurrentUserUsecase {
  execute(): Promise<UserModel | null>;
}
