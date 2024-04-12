import { GameModel } from '@domain/models';

export interface IGetCurrentGameUsecase {
  execute(): Promise<GameModel | null>;
}
