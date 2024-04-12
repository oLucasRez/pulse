import { UserModel } from '@domain/models';

export interface IGetMeUsecase {
  execute(): Promise<UserModel | null>;
}
