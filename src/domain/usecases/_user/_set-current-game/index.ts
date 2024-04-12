import { UserModel } from '@domain/models';

export interface ISetCurrentGameUsecase {
  execute(gameID: string | null): Promise<UserModel>;
}
