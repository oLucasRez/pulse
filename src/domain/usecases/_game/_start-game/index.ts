import { GameModel } from '@domain/models';

export interface IStartGameUsecase {
  execute(): Promise<GameModel>;
}
