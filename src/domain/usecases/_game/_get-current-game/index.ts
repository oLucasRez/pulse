import { GameModel } from '@domain/models';

export interface GetCurrentGameUsecase {
  execute(): Promise<GameModel | null>;
}
