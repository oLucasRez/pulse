import { UserModel } from '@domain/models';

export interface GetMeUsecase {
  execute(): Promise<UserModel | null>;
}
