import { UserModel } from '@domain/models';

export interface SetCurrentGameUsecase {
  execute(gameID: string): Promise<UserModel>;
}
